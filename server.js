const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const URL = process.env.API_URL;
console.log(`Your port is ${PORT}`);


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
  console.log(trends_image_path);
  console.log(forecast_image_path);

  var data = [{"Area":"Dublin1", "Year":2019, "Quarter":1, "Average_Rent":1589},{"Area":"Dublin1", "Year":2019, "Quarter":1, "Average_Rent":1589}];

  res.render('plot.ejs',{trends_img: trends_image_path, forecast_img: forecast_image_path, data: data});



//   let url = ``
// request(url, function (err, response, body) {
//     if(err){
//       res.render('index', {weather: null, error: 'Error, please try again'});
//     } else {
//       let weather = JSON.parse(body)
//       if(weather.main == undefined){
//         res.render('index', {weather: null, error: 'Error, please try again'});
//       } else {
//         let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//         res.render('index', {weather: weatherText, error: null});
//       }
//     }
//   });

})

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})