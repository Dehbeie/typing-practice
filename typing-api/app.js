const http = require('http');

const port = process.env.PORT || 3000;

const texts = [
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
    "We are not afflicted with a new life, but we are gifted with the capacity to begin anew each day. What you do today is important, because you are exchanging a day of your life for it. When tomorrow comes, this day will be gone forever, leaving in its place something that you have traded for it.",
    "To walk deep into the quiet forest is to enter a world where time moves at a different pace. Sunlight filters through the dense canopy above, casting shifting patterns of gold and shadow across the ancient moss, while the distant rush of a hidden stream provides a steady, grounding rhythm to the afternoon.",
    "Deep work is the ability to focus without distraction on a cognitively demanding task. It is a skill that allows you to quickly master complicated information and produce better results in less time. In a world full of constant digital noise, cultivating this practice makes you rare, valuable, and highly impactful.",
    "The Milky Way galaxy spans roughly 100,000 light-years in diameter and contains upwards of 100 billion stars. Our own solar system resides in the Orion Cygnus arm, orbiting the galactic center at a speed of 230 kilometers per second. It takes approximately 230 million years for Earth to complete just one full cosmic voyage.",
    "Modern web-development requires a deep understanding of user-experience design and responsive layouts. Developers must balance high-performance code with accessible user-interfaces across desktop and mobile-first platforms. Static-site generators and server-side rendering have become the industry-standard for building fast, secure websites.",

];

const server = http.createServer((req, res) => {

    if (req.url === '/api/text' && req.method === 'GET') {

        const randomIndex = Math.floor(Math.random() * texts.length);
        const randomText = texts[randomIndex];

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            text: randomText
        }));

        return;
    }

    res.writeHead(404, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        error: 'Route not found'
    }));
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});