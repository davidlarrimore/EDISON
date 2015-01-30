var express = require('express');
var router = express.Router();
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion());


/* GET home page. */
router.get('/', function(req, res, next) {
    var myOnboardLed = new mraa.Gpio(13);
    var ledState = myOnboardLed.read();
    var ledMessage = '';
    console.log('ledState Before = ' + ledState); //write the mraa version to the Intel XDK

    //inverting signal
    if(ledState == 0){
        ledState = 1;
        ledMessage = 'Light is Off!';
    }else{
        ledState = 0;
        ledMessage = 'Light is On!';
    }

    try {
        myOnboardLed.dir(mraa.DIR_OUT);
        myOnboardLed.write(ledState); //if ledState is true then write a '1' (high) otherwise write
    }
    catch(err){
        //console.log(err.message);
        //TODO: send error to UI
    }
    finally{
        res.render('mraa', { title: 'MRAA Blink Example', ledState: ledState, ledMessage: ledMessage });
    }
});

module.exports = router;
