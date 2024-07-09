const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4088;

app.use(cors());
app.use(express.json());

// Fetch data from the given link
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        console.log('Fetched data:', response.data); // Log the fetched data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});