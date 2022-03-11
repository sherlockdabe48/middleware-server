const express = require('express');
const request = require('request');
const querystring = require('querystring');

const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// app.get('/posts', function(req,res) {
//     //modify the url in any way you want
//     var newurl = 'https://jsonplaceholder.typicode.com/posts';
//     request(newurl).pipe(res);
// });

var form = {
  masterConsentCode: "MC-LINEOA-001",
  system: "LINEOA",
  project: "LINEOA-001",
  identityKey: "sherlock48",
};

var formData = querystring.stringify(form);

console.log(formData)
console.log(typeof formData)



app.get('/consent/checkisconsent', function(req,res) {
    //modify the url in any way you want
    // var newurl = '';
    // console.log("req.headers: ",req.headers)
    // console.log("req.query: ",req.query)
    // request.get({ 
      // url: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/checkisconsent',
      // body: req.query,
      // headers: req.headers
    
    // }).pipe(res);  
    // request(newurl).pipe(res);


    request({
      
      headers: {
        CONTROLKEY: '768D680593FF40F4D817A1A045D3FD28992E096664EB94B5BB749851E6DABF86',
        Authorization: `Bearer 32f452ff-41fb-50cd-9b13-156e56b84880`,
        "content-Type": "application/json",
      },
 
      uri: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/checkisconsent',
      body: JSON.stringify(req.query),
      method: 'GET'
    }, function (err, res, body) {
      //it works!
      console.log("RES: ",res)
      console.log('--------------')
      // console.log("BODY: ",body)
    });
});
// app.get('/consent/getmasterconsent', function(req,res) {
//     //modify the url in any way you want
//     var newurl = 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/getmasterconsent';
//     request(newurl).pipe(res);
// });

  app.post('/login/token', (req, res) => {
    console.log(req.body)
    request.post({ url: 'https://authorization1.navakij.co.th/authorization-api-1.0.0/login/token', form: req.body}).pipe(res);  
  })


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));