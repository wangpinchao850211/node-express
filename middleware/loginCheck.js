const { ErrorModel } = require('../model/resModel')

// 登陆中间件
module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登录')
    )
}
