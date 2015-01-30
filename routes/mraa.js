var express = require('express');
var router = express.Router();
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion());


/* GET home page. */
router.get('/', function(req, res, next) {
    var myOnboardLed = new mraa.Gpio(13);
    //myOnboardLed.dir(mraa.DIR_IN); 
    var ledState = myOnboardLed.read();
    console.log('ledState Before = ' + ledState); //write the mraa version to the Intel XDK

    myOnboardLed.dir(mraa.DIR_OUT);

    //inverting signal
    if(ledState == 0){
        ledState = 1;
    }else{
        ledState = 0;
    }

    //console.log('ledState After = ' + ledState); //write the mraa version to the Intel XDK
    myOnboardLed.write(ledState); //if ledState is true then write a '1' (high) otherwise write
    
    res.render('mraa', { title: 'Express', ledState: ledState });
});

module.exports = router;
