var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 处理文件上传
// var DIR = 'uploads/';
// const upload = multer({dest: DIR});
// const singMidle = upload.single("singleFile"); // 处理一张
// const arrMidle = upload.array("arrayFile", 5); // 一次最多处理5张
// const fieldsMidle = upload.fields([
//   {name: "fieldSingleFile", maxCount: 1},
//   {name: "fieldArrayFile", maxCount: 4}
// ]); // 可同时处理多个上传控件
  
// 自定义文件存储: 注意对比blockChain，也是使用multer，使用的是array
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../files')
    },
    filename: function (req, file, cb) {
      cb(null, file.name + '-' + Date.now())
    }
})
const upload = multer({storage: storage, limits: {fileSize: 1024*1024*20}}).any();

/* uploader page. */
router.get('/fileuploadlist', function (req, res, next) {
    res.json(new SuccessModel('file catcher example'));
});

// router.post('/fileupload', singMidle, function (req, res, next) {
//     // req.file 是 `avatar` 文件的信息
//     // req.body 将具有文本域数据，如果存在的话
//     console.log('yyyyyyyyyy')
//     console.log(req.body)
//     console.log(req.file)
//     let postData = ''
//     // req.on('data', chunk => {
//     //     postData += chunk.toString()
//     // })
//     // req.on('end', () => {
//     //     if (!postData) {
//     //         return
//     //     }
//     //     console.log(`wpx:${postData}`);
//     // })
//     res.end(new SuccessModel('File is uploaded')); 
// });

const urlencoded = bodyParser.urlencoded({extended: false});
router.post('/fileupload', function (req, res, next) {
    
    console.log(req)
    console.log('yyyyyyyyyy')
    console.log(req.body)
    console.log(req.file)
    upload(req, res, function (err) {
        // if (err instanceof multer.MulterError) {
        //   // 发生错误
        // } else if (err) {
        //   // 发生错误
        // }
        res.json(new SuccessModel('File is uploaded')); 
        // 一切都好
        // if (err) {  
        //     res.json({ path: `//files/my-uploads/${uploadFile.filename}` });  
        //     console.log(err);  
        //     return;  
        //   };  
        //   console.log(req.files);  
        //   let uploadFile = req.files[0];  
        //   res.json({ path: `//files/my-uploads/${uploadFile.filename}` });  
    })
    
});

router.post('/fileuploadArray', function (req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话
    console.log('PPPPPPPPPPPPPP')
    console.log(req.body)
    console.log(req.files)
    upload(req, res, function (err) {
        res.json(new SuccessModel('File Array is uploaded'));
    })
    
})

// router.post('/fileupload', fieldsMidle, function (req, res, next) {
    // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body 将具有文本域数据，如果存在的话
//     console.log('yyyyyyyyyy')
//     console.log(req.files)
// })

module.exports = router;
