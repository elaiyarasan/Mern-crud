const router = require('express').Router();
const formCreationModel = require('../models/formcreation.model');
var multer  = require('multer');
var mkdirp = require('mkdirp');
const path = require("path");
const sharp = require('sharp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //var code = JSON.parse(req.body.model).empCode;
    var dest = 'public/uploads/';
    mkdirp(dest, function (err) {
        if (err) cb(err, dest);
        else cb(null, dest);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post('/create', upload.any(),async (req, res) =>{
    try {
    const data = JSON.parse(req.body.anotherdata)
    if (req.files) {
        let fileLocation ='./../public/uploads/'+req.files[0].filename;
        
        sharp(path.resolve(__dirname +fileLocation))
            .resize(300,300)
            .toFile('./public/uploads/thumbnail-'+req.files[0].filename);

        sharp(path.resolve(__dirname +fileLocation))
            .resize(900,900)
            .toFile('./public/uploads/preview-'+req.files[0].filename);

       const formData = await new formCreationModel({
            imagetitle: data.imagetitle ? data.imagetitle : 'null',
            imagedescription: data.imagedescription ? data.imagedescription : 'null',
            attachementOrginalName:req.files[0].originalname,
            attachementName:req.files[0].filename,
            compressedattachementName:req.files[0].filename,
            category: data.category ? data.category:'',
            itemForSale: data.itemForSale,
            amount: data.amount ? data.amount:'',
            termAndCond:true,
        }).save();
        return res.status(200).json(formData);
        }
    } catch (error) {
        return res.status(500).json(error);
        
    }  
});

router.post('/update', upload.any(),async (req, res) =>{
    try {
        const data = JSON.parse(req.body.anotherdata)
    if (req.files.length>0) {

        let fileLocation ='./../public/uploads/'+req.files[0].filename;
        sharp(path.resolve(__dirname +fileLocation))
            .resize(300,300)
            .toFile('./public/uploads/thumbnail-'+req.files[0].filename);

        sharp(path.resolve(__dirname +fileLocation))
            .resize(900,900)
            .toFile('./public/uploads/preview-'+req.files[0].filename);

        const formData =  await formCreationModel.updateOne({ _id: data.id }, { 
            imagetitle: data.imagetitle ? data.imagetitle : 'null',
            imagedescription: data.imagedescription ? data.imagedescription : 'null',
            attachementOrginalName:req.files[0].originalname,
            attachementName:req.files[0].filename,
            compressedattachementName:req.files[0].filename,
            category: data.category ? data.category:'',
            itemForSale: data.itemForSale ? data.itemForSale :'',
            amount: data.amount ? data.amount:'',
            termAndCond:true,
        });
        let latTest = await formCreationModel.findOne({_id:data.id});
        return res.status(200).json(latTest)
        }else{
            const formData =  await formCreationModel.updateOne({ _id: data.id }, { 
                imagetitle: data.imagetitle ? data.imagetitle : 'null',
                imagedescription: data.imagedescription ? data.imagedescription : 'null',
                category: data.category ? data.category:'',
                itemForSale: data.itemForSale ? data.itemForSale :'',
                amount: data.amount ? data.amount:'',
            });     
            let latTest = await formCreationModel.findOne({_id:data.id});
            return res.status(200).json(latTest)
        }
    } catch (error) {
        return res.status(500).json(error); 
    }  
});

router.get('/getFormData/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        const id = req.params.id ;
        const data = await formCreationModel.findOne({_id: id});
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json(err);
    } 
});


router.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id ;
        const data = await formCreationModel.findOneAndRemove({_id: id});
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json(err);
    } 
});


router.get('/list',async(req,res)=>{
    try{
        const data = await formCreationModel.find({});
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json(err);
    } 
});


// image preview
router.get('/fetchImage/:file(*)', (req, res) => {
    let file = req.params.file;
    // let fileLocation = path.join('../uploads/'+file);
    let fileLocation ='./../public/uploads/'+file;
    res.sendFile(path.resolve(__dirname +fileLocation))
});


module.exports = router;