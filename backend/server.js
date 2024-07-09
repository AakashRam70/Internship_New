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

// API endpoint to get the bar chart data
app.get('/api/bar-chart-data', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0,
        };

        products.forEach(product => {
            const price = product.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.json(priceRanges);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
