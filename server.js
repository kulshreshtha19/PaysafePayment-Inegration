var express = require('express')

  , http = require('http');
//   var cors = require('cors')
var app = express();

var index = require('./index');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+'public'));

app.post('/createCustomer',async function(req,res){
    console.log(req.query.merchantId+req.query.firstName+req.query.LastName+req.query.email+req.query.phone)
    res.send(await index.createCustomer(req.query.merchantId,req.query.firstName,req.query.LastName,req.query.email,req.query.phone))
});
// app.get('/createCustomer', function (req, res) {
//     res.send('hello world')
//   });

app.post('/verifyPayment',async function(req,res){
    res.send(await index.verifyPayment(req.query.amount,req.query.paymentHandleToken,req.query.currencyCode))
})

app.get('/',function(req,res){
    res.sendFile(__dirname +'/final.html');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
