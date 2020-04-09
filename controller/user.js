const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const jwt = require('jsonwebtoken')

// const login = (username, password) => {
//     username = escape(username)
    
//     // 生成加密密码
//     password = genPassword(password)
//     // console.log(password);
//     password = escape(password)

//     const sql = `
//         select username, realname from users where username=${username} and password=${password}
//     `
//     // console.log('sql is', sql)
//     return exec(sql).then(rows => {
//         return rows[0] || {}
//     })
// }

function createToken(username, password)  {
    const cert = '19850211qwertyuiiomiyao';
    let created = Math.floor(Date.now()/1000)
    let token = jwt.sign({
        username: username,
        password: password,
        admin: true,
        iss: 'wangpinchao',
        exp: created + 60 * 600,
        iat: created
    }, cert, {algorithm: 'RS256'})
    return token;
}

const login = (username, password) => {
    username = escape(username)
    // 生成加密密码
    password = genPassword(password)
    const source = {
        username: 'qihuan.wang@126.com',
        password: '3b0034a778af2bb019fe7b3b128ee6aa' // wqh9090QQ
    }
    const promise = new Promise((resolve, reject) => {
        if (escape(source.username) == username && source.password === password) {
            const tokenvalue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InFpaHVhbi53YW5nQDEyNi5jb20iLCJhZG1pbiI6dHJ1ZSwiaXNzIjoid2FuZ3BpbmNoYW8ifQ.AjOTOXD-GOHl1n1EIYM4Jz2PpdW1zxG67_i6EytbWz0'
            resolve({username: source.username, realname: '王品朝', status: 1, token: tokenvalue})
        } else {
            resolve({status: 0, token: null})
        }
    })
    return promise;
}

module.exports = {
    login
}