// CodeSnap CORS Proxy — Cloudflare Worker
// Deploy: npx wrangler deploy
// Free tier: 100,000 requests/day

export default {
    async fetch(request) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const { token, ...payload } = await request.json();

            if (!token) {
                return corsJson({ error: 'No token provided' }, 400);
            }

            // Forward to Browserless
            const blRes = await fetch(
                `https://production-sfo.browserless.io/screenshot?token=${token}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            if (!blRes.ok) {
                const errText = await blRes.text();
                return corsJson({ error: `Browserless error (${blRes.status}): ${errText.substring(0, 200)}` }, blRes.status);
            }

            // Return the screenshot with CORS headers
            const imageBuffer = await blRes.arrayBuffer();
            return new Response(imageBuffer, {
                status: 200,
                headers: {
                    'Content-Type': 'image/png',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                },
            });

        } catch (err) {
            return corsJson({ error: err.message }, 500);
        }
    },
};

function corsJson(data, status) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
