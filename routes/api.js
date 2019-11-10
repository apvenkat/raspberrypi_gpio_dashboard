var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const Gpio = require('onoff').Gpio;
var fs = require('fs');
var gpiodata = require('../config/gpio-config.json');

router.get('/api', function(req, res) {
  res.json(gpiodata);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', function(req, res) {
  gpiodata.unshift(req.body);
  fs.writeFile('config/gpio-config.json', JSON.stringify(gpiodata), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(gpiodata);
});

router.post('/api/on/:id', function(req, res) {
  const led = new Gpio(gpiodata[req.params.id].gpio, 'out');
  led.writeSync(1);
res.sendStatus(200);

});

router.post('/api/off/:id', function(req, res) {
  const led = new Gpio(gpiodata[req.params.id].gpio, 'out');
  led.writeSync(0);
res.sendStatus(200);
  
});



router.delete('/api/:id', function(req, res) {
  gpiodata.splice(req.params.id, 1);
  fs.writeFile('config/gpio-config.json', JSON.stringify(gpiodata), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(gpiodata);
});



module.exports = router;
