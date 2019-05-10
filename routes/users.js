var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const assert = require('assert')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alanwu4321:Alanwu131441$$$@cluster0-xiedu.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 });
const download = require('image-downloader')
var Promise = require('promise');


router.use(cors())
router.use(bodyParser.json());


router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  getUserbyEmail(email).then(function (profile) {
    // const isValid = bcrypt.compareSync(password, profile.password);
    console.log(true)
    true ? res.status(200).json(profile) : res.status(400).json("Sorry error logging in")
    // client.close();
  })
})

function getUserbyEmail(email) {
  return new Promise(function (resolve, reject) {
    client.connect(err => {
      const profiles = client.db("users").collection("profiles");
      profiles.find({ email: email }).toArray(function (err, result) {
        if (err) {
          reject(err)
        }
        else {
          resolve(result[0]);
        }
        // client.close();
      });
    });
  })
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'This is User' });

});



module.exports = router;
