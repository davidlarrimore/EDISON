var express = require('express');
var router = express.Router();
var Cylon = require('cylon');


/* GET home page. */
router.get('/', function(req, res, next) {

    Cylon.robot({
      connections: {
        edison: { adaptor: 'intel-iot' }
      },

      devices: {
        led: { driver: 'led', pin: 13 }
      },

      work: function(my) {
        every((1).second(), my.led.toggle);
      }
    });

    Cylon.start();    
    res.render('cylon', { title: 'Express' });
    
});


module.exports = router;
