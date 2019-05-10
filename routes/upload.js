//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
var express = require('express');
var dataUriToBuffer = require('data-uri-to-buffer');
var router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const s3 = new AWS.S3();

router.use(bodyParser.json({limit: '150mb', extended: true}))
router.use(bodyParser.urlencoded({limit: '150mb', extended: true}))
router.use(cors())

/* GET home page. */
// fetch('http://www.makeup.com/-/media/images/makeup/2018/september/11-ultimate-makeup/the-ultimate-makeup-tutorial-eyeshadow-lipstick-face-hero-mudc-091118_r2.jpg')
//   .then(res => {
//     return s3.putObject({Bucket, Key, Body: res.body}).promise();
//   })

// s3.listBuckets(function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data);           // successful response
// });

// fetch('http://www.makeup.com/-/media/images/makeup/2018/september/11-ultimate-makeup/the-ultimate-makeup-tutorial-eyeshadow-lipstick-face-hero-mudc-091118_r2.jpg')
//   .then(res => {
//     console.log(res.body)
//     return s3.putObject({ Bucket: "asianglowpic", Key: "test.jpg", Body: res.body }).promise();
//   }).then(res => {
//     console.log(null, res);
//   }).catch(err => {
//     console.log(err, null);
//   });

// fetch('https://dxs1x0sxlq03u.cloudfront.net/sites/default/files/article-image/eminence-organics-acne-face-mapping.jpg')
//   .then((response) => {
//     if (response.ok) {
//       return response;
//     }
//     return Promise.reject(new Error(
//       `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
//   })
//   .then(response => response.buffer())
//   .then(buffer => (
//     s3.putObject({
//       Bucket: "asianglowpic",
//       Key: "test3.jpg",
//       Body: dataUriToBuffer(''),
//       ACL: 'public-read'
//     }).promise()
//   ))
//   .then(v => console.log("asd"), console.log("asdf"));
s3.putObject({
  Bucket: "agpic",
  Key: "test4.jpg",
  Body: dataUriToBuffer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='),
  ACL: 'public-read'
}).promise()

router.get('/', function (req, res, next) {
  
  res.status(200).json({"status":"success"})
  // res.render('index.html', { title: 'Express' });
});

router.post('/inputURL', function (req, res, next) {
  var fileName = `upload/${Math.random().toString(36).substring(7)}.jpg`

  fetch(req.body.userInput)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
        `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: "agpic",
        Key: fileName,
        Body: buffer,
        ACL: 'public-read'
      }).promise().then(function(data) {
        console.log(data);
        res.status(200).json({"status":"success","fileName":fileName})
      }).catch(function(err) {
        console.log(err);
        res.status(400).json({"status":err})
      })
    ))
   
});

router.post('/test', function (req, res, next) {
  res.status(200).json({"data":req.body})
});

router.post('/imgData', function (req, res, next) {
  var fileName = `upload/${Math.random().toString(36).substring(7)}.jpg`
  s3.putObject({
          Bucket: "agpic",
          Key: fileName,
          Body: dataUriToBuffer(req.body.imageData),
          ACL: 'public-read'
        }).promise().then(function(data) {
          console.log(data);
          res.status(200).json({"status":"success","fileName":fileName})
        }).catch(function(err) {
          console.log(err);
          res.status(400).json({"status":err})
        });
});

module.exports = router;
