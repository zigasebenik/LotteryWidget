const request = require('request');
var users = require('../lottery/users');

var counter = 30;

var winners = []

setInterval(function(){
    //console.log(counter)

    if(counter == 0)
    {
        users.users.forEach(user => {
            console.log(user);

            if(user.number == winningNumber)
            {
                winners.push(user);
            }
        });

        while(winners.length > 5)
        {
            winners.shift();
        }

        console.log(winners)

        counter = 30;
    }

    if(counter == 30)
    {
        /*console.log(users.users[0] && users.users.length <5)
        if(users.users[0])
            winners.push(users.users[0])*/

        request('https://celtra-lottery.herokuapp.com/api/getLotteryNumber', { json: true }, (err, res, body) => {
            if (err)
            {
                console.log(err);
            }

            winningNumber = res.body.lotteryNumber;

            console.log(winningNumber)
        });
    }

    counter--;
}, 1000);


function getCounter()
{
    return counter;
}


function getWinners()
{
    return winners
}

module.exports = {
    getCounter,
    getWinners
}

