const router = require('express').Router();
const Sub = require('../models/sub.model');
const webpush = require('web-push');

const vapidKeys = {
  "publicKey":"BO8Q5xwPDGMT-pISGS9B6eLSQZ1VDUxUaegDAdkasBwrAMAkBuoCpNm47CfV7yzdulw9lbgpWPNZcJQeXYWekjU",
  "privateKey":"LhwKt811Na2RfMVDLL4Ww3N7BiAj0BLFch3znKT6Zg4"
}

webpush.setVapidDetails(
  'mailto:contact@dyma.fr',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const notification = {
  "notification": {
    "title": "Bienvenue sur dyma",
    "body": "bonjour bonjour"
  }
}


router.post('/', (req, res) => {
  const sub = req.body;
  if (sub) {
    const newSub = new Sub({
      details: sub
    });
    newSub.save( (err) => {
      if (err) { return res.status(500).json('save sub failed') }
      res.json('sub ok !')
    })
  } else {
    res.status(404).json('no subscription');
  }
});

router.get('/test', (req, res) => {
  Sub.find({}).exec().then( (subs) => {
    Promise.all(subs.map( (sub) => {
      webpush.sendNotification(sub.details, JSON.stringify(notification))
    })).then( () => {
      res.json('notifications sent');
    }).catch( (err) => {
      res.status(500).json('notifications NOT sent !');
    })
  })
})

module.exports = router;