const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const URL = process.env.API_URL;



app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  // res.send('Hello World!')
  res.render('index')
})

app.post('/plots', function (req, res) {

  console.log(req.body);

  var city = req.body.city;
  var bhk = req.body.bhk;
  var price = req.body.price;
  var trends_image_path = "images/trends/" + city + "_" + bhk + "_trend.png"
  var forecast_image_path = "images/forecast/" + city + "_" + bhk + "_forecast.png"

  var data = [{"Area":"Dublin1", "Year":2019, "Quarter":1, "Average_Rent":1589},{"Area":"Dublin1", "Year":2019, "Quarter":1, "Average_Rent":1589}];

  let url = URL + `?areas=` + city + `&beds=` + bhk;
  request(url, function (err, response, body) {
    console.log(`here`);
    if(err){
      console.log("Request error");
      res.render('plot.ejs',{trends_img: trends_image_path, forecast_img: forecast_image_path, data: data});
    }
    else
    {
      data = body
      res.render('plot.ejs',{trends_img: trends_image_path, forecast_img: forecast_image_path, data: data});
    }
  });

})

app.listen(PORT, function () {
  console.log(`Your port is ${PORT}`);
})