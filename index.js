// include('https://hosted.paysafe.com/checkout/v2/paysafe.checkout.min.js')

const fetch = require('node-fetch');
// var paysafe = require('paysafe');

// const apiKey = 'cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ='
//     const currency = 'USD'
//     const locale = "en_US"
//     const environment = "TEST"
//     const companyName = "Paysafe Merchant"
//     const merchantRefNum = "1559900597607"
//     const merchantDescriptor = {
//         dynamicDescriptor: "XYZ",
//         phone: "1234567890"
//     }
//     const paymentMethods = ["card"]




// let userInfo = {
//     firstName: 'John',
//     lastName: 'Smith',
//     email: 'john.smith@email.com',
//     day: '1',
//     month: '1',
//     year: '1999',
//     address: 'NA',
//     city: 'Hindaun',
//     stateCode: 'RJ',
//     zipCode: '322230',
//     countryCode: 'IN',
//     phone: '777-444-8888',
//     amount: '1'
// }

var customerid =null;
var singleUserToken = null;
// var merchantRefNum = Math.random().toString(36).slice(2);

exports.createCustomer = function(customerId,firstName,lastName,email,phone){
    const body = JSON.stringify( {
        merchantCustomerId : customerId,
        locale : 'en_US',
        firstName : firstName,
        lastName : lastName,
        email : email,
        phone : phone
    })
    console.log(JSON.parse(body).merchantCustomerId)
   return new Promise(function(resolve,reject){
    fetch('https://api.test.paysafe.com/paymenthub/v1/customers',{
        method : 'post',
        body : body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            'Simulator': '\'EXTERNAL\''
          }
    }).then(res => res.json()).then(data => {
        var temp = useData(data)
        resolve(temp)
    })
   }) ;

    async function useData(data)
    {
        // customerid = data
        // console.log(data);
        if(data.id==null)
        {
            customerid = 'Error'
            customerid = await getCustomers(JSON.parse(body).merchantCustomerId)
            console.log('customerid');
            console.log(customerid);
            // body.customer = 'Hello'
        }

        else{
            customerid = data.id
        }

        singleUserToken = await getSingleUserToken(customerid)
        console.log(singleUserToken)
        // res.send('DONE');
        return singleUserToken
    } 
    // res.send(singleUserToken)
    // return singleUserToken
    // return 'singleUserToken'
}

function getSingleUserToken(customerid)
{
    return new Promise(function(resolve,reject){
        fetch('https://api.test.paysafe.com/paymenthub/v1/customers/'+customerid+'/singleusecustomertokens',{
            method : 'post',
            body:JSON.stringify({
                merchantRefNum: Math.random().toString(36).slice(2),
                paymentTypes: [
                  'CARD'
                ]
              }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            }
        }).then(data => data.json()).then(singleToke => {
            resolve(singleToke.singleUseCustomerToken)
        })
    });    
}

function getCustomers(merchantCustomerId)
{
    return new Promise(function(resolve,reject){
        fetch('https://api.test.paysafe.com/paymenthub/v1/customers?merchantCustomerId='+merchantCustomerId,
        {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            }
        }        
    ).then(data => data.json()).then(token => {
        resolve(token.id)
    })}) 
}

exports.verifyPayment = function(amount,paymentHandleToken,currencyCode){
    return new Promise(function(resolve,reject){
        fetch('https://api.test.paysafe.com/paymenthub/v1/payments',{
            method : 'post',
            body : JSON.stringify({
                merchantRefNum : Math.random().toString(36).slice(2),
                amount : amount,
                currencyCode : currencyCode,
                paymentHandleToken : paymentHandleToken
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            }
        }).then(data => data.json()).then(value =>{
                console.log(value)
                resolve(value.status)  
        })
    });
}

// global.GlobalConstants = {
// }
