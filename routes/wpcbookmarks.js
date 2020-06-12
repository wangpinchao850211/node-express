/**
 * 这里是所有书签分类的路由
 */ 

var express = require('express');
var router = express.Router();
const { 
    getList, 
    getMenuAllArticle,
    getDetail, 
    newBlog,
    updateBlog,
    delBlog } = require('../controller/wpcbookmarks.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

/* GET 博客菜单 list. */
router.get('/marklist', function(req, res, next) {
    const result = getList();
    return result.then(data => {
        console.log(data);
        const reqData = {
            books: data
        } ;
        res.json(new SuccessModel(reqData, 'get menu list'));
    })
});
/* GET 博客某一菜单下的所有文章 All article in a field. */
router.get('/marklist:id', function(req, res, next) {
    const result = getMenuAllArticle(req.query.menuid);
    return result.then(data => {
        res.json(new SuccessModel('get All article by id'));
    })
});
/* GET 某一文章的博客详情. */
router.get('/detail', (req, res, next) => {
    // 需要菜单id，和文章的id
    const result = getDetail(req.query.menuid, req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});
/* POST请求 */
// 新建博客
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
    const result = updateBlog(req.query.menuid, req.query.id, req.body)
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
    const result = delBlog(
                        req.query.menuid, 
                        req.query.id
                    )
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
