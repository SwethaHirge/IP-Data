const express = require('express');
const request = require("request-promise");
const app = express();


app.get("/", async (req, res) => {
  try {
    const url = "http://ip-api.com/json";
    const response = await request(url);
    console.log(response);
    const data = JSON.parse(response);
    const clientIp = data.query;
    const locationData = await request(`https://api.ipdata.co/${clientIp}?api-key=e52b05757ad1ed4a66cc621d9e09af5f33256b8273fc9421805b5bc3`);
    const resp =JSON.parse(locationData);
    res.send({
      IP:resp.ip,
      City:res.city,
      Region:resp.region,
      Country:resp.country_name,
      Postal:resp.postal
    });
  } catch (error) {
    res.send("Error!");
  }
});


app.listen(6000, () => console.log('Listening on port 6000'));  
