const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from FE
app.use(express.json()); // Parse JSON bodies

// Endpoint to receive city selection logs
app.post('/log-city-selection', (req, res) => {
    const { city, countryCode } = req.body;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] City selected: ${city}, Country: ${countryCode}`);
    res.status(200).send('Logged');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Logger server running on http://localhost:${PORT}`);
});
