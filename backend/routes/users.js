const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' +err));
});

// Register user
router.route('/add').post((req,res) => {
    const phone = req.body.phone;
    const otp = Math.floor(Math.random()*(999-100+1)+100);
    const newUser = new User({phone,otp});
    newUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(err => res.status(500).json('Error: '+err));
});

// Update otp
router.post('/otpUpdate',async(req,res) => {
    const phone = req.body.phone;
    const otp = req.body.otp;
    const user = await User.findOne({phone: phone});
    if(user.otp == otp){
        await User.updateOne({phone: phone},{otp,status:'Active',otpstatus:'Verified'})
            .then(() => res.status(200).json('User added!'))
            .catch(err => res.status(500).json('Error: '+err));
    }else{
        return res.status(500).json('Error: Entered otp is not match please try again');
    }
});

module.exports = router;