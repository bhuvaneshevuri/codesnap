// Vercel Serverless Function — CORS proxy for Browserless.io
// This runs server-side, avoiding browser CORS restrictions

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { token, ...payload } = req.body;
        if (!token) return res.status(400).json({ error: 'No token provided' });

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
            return res.status(blRes.status).json({
                error: `Browserless error (${blRes.status}): ${errText.substring(0, 200)}`
            });
        }

        const buffer = Buffer.from(await blRes.arrayBuffer());
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'no-cache');
        return res.status(200).send(buffer);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
