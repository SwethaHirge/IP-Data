const express = require('express');
const axios = require('axios');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-ip");
  next();
});

app.get('/lookup-location', async (req, res) => {
  try {
    const clientIp = req.headers['x-client-ip'];
    const response = await axios.get(`https://api.ipdata.co/${clientIp}?api-key=e52b05757ad1ed4a66cc621d9e09af5f33256b8273fc9421805b5bc3`);
    const locationData = response.data;
    console.log(locationData);
   return  res.json(locationData);
  } catch (error) {
   return res.status(500).send({
      message: 'Error looking up location',
      err: error
    });
  }

});

app.listen(8000, () => console.log('Listening on port 8000'));
