var express = require('express');
var router = express.Router();
const { login } = require('../controller/user.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* login page. */
router.post('/login', function(req, res, next) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const result = login(username, password)
    return result.then(data => {
        console.log(data);
        if (data.username) {
            // 设置 session (登陆时已经将session存储起来了，在其他路由中可以获取到session了)
            req.session.username = data.username
            req.session.realname = data.realname

            console.log(req.session);
            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('登录失败'));
    })
});
// 测试登陆
// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json({
//             errno: 0,
//             msg: '已登录'
//         })
//         return
//     }
//     res.json({
//         errno: -1,
//         msg: '未登录'
//     })
// })
// 可实现存储前端浏览信息，例如访问次数
// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++

//     res.json({
//         viewNum: session.viewNum
//     })
// });

module.exports = router;