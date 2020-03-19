const xss = require('xss')
var path = require('path');
var fs = require('fs');

// 默认页面加载数据
const menulist = [];
const getList = () => {
    // 获取所有菜单，知识文件名称
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        menulist = [...result]; // 缓存一份数据
        // resolve(result)
    })

    // 返回 promise
    return promise
}

const getMenuAllArticle = (menuid) => {
    console.log(menuid);
    // 获取某一菜单下的所有文章
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // resolve(result)
    })

    // 返回 promise
    return promise
}

const getDetail = (menuid, id) => {
    // 第一步，通过menuid获取到菜单的文件
    // 第二步，通过id获取到此菜单下相应的文章，返回
    console.log(menuid);
    console.log(id);
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // resolve(result)
    })  
    return promise;
}

const newBlog = (blogData = {}) => {
    // 创建文件，文件名称不存在，才能创建
    console.log(blogData); // 创建的内容
    const securityData = xss(blogData);
    access(securityData.menuName, securityData) // 写入文章
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // resolve(result)
    })  
    return promise;
}

const updateBlog = (menuid, id, blogData = {}) => {
    // menuid 此菜单的id
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    console.log(blogData); // 创建的内容
    console.log(menuid);
    console.log(id);
    const securityData = xss(blogData);
    delBlog(menuid, id); // 首先删除原博客
    access(securityData.menuName, securityData) // 其次再写入文章
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // resolve(result)
    })  
    return promise;
}

const delBlog = (menuid, id) => {
    // menuid 此菜单的id
    // id 就是要删除博客的 id
    console.log(menuid);
    console.log(id);
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // resolve(result)
    })  
    return promise;
}


// 写内容
function writeBlog(writeStream, content) {
    writeStream.write(content + '\n')  // 关键代码
}

// 生成 write Stream
function createWriteStream(menuName) {
    const fullFileName = path.join(__dirname, '../', 'files', menuName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

// 写如博客内容（文件名需要有个处理方法！）
const accessWriteStream = createWriteStream(name = `wpc_tech}`)
function access(name, content) {
    writeBlog(accessWriteStream(name), content)
}

module.exports = {
    getList,
    getMenuAllArticle,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}