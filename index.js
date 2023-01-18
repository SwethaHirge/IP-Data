const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


app.get('/location', (req, res) => {
    const apiKey = process.env.API_KEY;
    axios.get(`https://api.ipdata.co?api-key=${apiKey}`)
        .then(response => {
            console.log(response.data.ip);
            res.json({
                city:response.data.city,
                region:response.data.region,
                country:response.data.country_name,
                // data:response.data
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error looking up location');
        });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


