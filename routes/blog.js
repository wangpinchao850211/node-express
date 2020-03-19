var express = require('express');
var router = express.Router();
const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

/* 博客处理接口: 
    后期研究使用json存储作为sql, 
    生成自己的知识汇总文章记录 
    */
// 博客列表
router.get('/list', (req, res, next) => {

    console.log(req.query);
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    console.log(author);
    console.log(keyword);
    if (req.query.isAdmin) {
        // 管理员界面
        console.log(req.session);
        if (req.session.username == null) { // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return;
        }
        // 强制查询自己的博客
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
        //   res.json相当于res.end(JSON.stringify(data)), 同时return回去了
        //   同时设置返回格式 JSON res.setHeader('Content-type', 'application/json')
        res.json(
            new SuccessModel(listData)
        )
    })
});
// 博客详情
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});
// 新建博客(post请求带session的需要浏览器，postman不好使了)
router.post('/new', loginCheck, function(req, res, next) {
    req.body.author = req.session.username
    console.log(req.body)
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})
// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})
// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})

module.exports = router;
