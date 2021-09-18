var express = require('express');
var lottery = require('../lottery/raffle');
var users = require('../lottery/users');
const {counter} = require("../lottery/raffle");

var router = express.Router();


router.get('/events', async function(req, res) {
  console.log('Got /events');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();


  let interValID = setInterval(() => {


    var params = JSON.stringify({
      counter: lottery.getCounter(),
      winners: lottery.getWinners()
    })

    res.write(`data: ${params}\n\n`);

    /*var params = JSON.stringify({
      data: lottery.getCounter(),
      winners: lottery.getWinners()
    })

    res.write(params)*/

  }, 1000);

  // If client closes connection, stop sending events
  res.on('close', () => {
    console.log('client dropped connection');
    clearInterval(interValID);
    res.end();
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

router.post('/new', function(req, res, next) {

  var user = JSON.parse(req.body.data);
  //console.log(user)
  users.addUser(user.name, user.number);

  res.status(200)
});

module.exports = router;
