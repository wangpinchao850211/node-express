const xss = require('xss')
var path = require('path');
var fs = require('fs');

// 默认页面加载数据
const menulist = [
    {
        "id": "A001",
        "name": "html5",
        "rating": "3.4",
        "desc": "h5标签,音频,视频,表格,表单,图表",
        "categories": ["web基础", "布局基础"]
    },
    {
        "id": "E002",
        "name": "Sass/Scss",
        "rating": "3.9",
        "desc": "Css预编译语言，scss使用技巧",
        "categories": ["css高级", "scss"]
    },
    {
        "id": "A002",
        "name": "css3",
        "rating": "3.5",
        "desc": "盒模型,选择器,继承,动画",
        "categories": ["web基础", "布局基础"]
    },
    {
        "id": "A003",
        "name": "JS高级",
        "rating": "4.2",
        "desc": "JS设计模式，基础处理函数，常用方法, ES-X",
        "categories": ["web基础", "dom操作基础", "bom操作基础"]
    },
    {
        "id": "C001",
        "name": "angular",
        "rating": "3.9",
        "desc": "angular框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "B001",
        "name": "http",
        "rating": "3.5",
        "desc": "web前后台链接基础，http参数汇总，ajax封装",
        "categories": ["web基础", "http基础", "webSocket"]
    },
    {
        "id": "D001",
        "name": "typescript",
        "rating": "3.9",
        "desc": "typescript语言特点，typescript使用技巧",
        "categories": ["JS高级", "typescript编译原理"]
    },
    {
        "id": "B002",
        "name": "git",
        "rating": "3.2",
        "desc": "项目code管理常用命令，github网址使用",
        "categories": ["项目管理", "node/npm命令"]
    },
    {
        "id": "E003",
        "name": "Echart",
        "rating": "3.6",
        "desc": "echart使用技巧",
        "categories": ["css高级", "scss"]
    },
    {
        "id": "B003",
        "name": "浏览器",
        "rating": "4.0",
        "desc": "chrome调试技巧，ie调试技巧",
        "categories": ["web基础", "bom操作", "浏览器兼容性研究"]
    },
    {
        "id": "B004",
        "name": "vs-code",
        "rating": "3.3",
        "desc": "vs-code使用指南",
        "categories": ["web基础", "code调试使用"]
    },
    {
        "id": "C002",
        "name": "react",
        "rating": "3.9",
        "desc": "react框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "C003",
        "name": "Vue",
        "rating": "3.9",
        "desc": "Vue框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "D002",
        "name": "webpack",
        "rating": "3.9",
        "desc": "webpack基础，webpack打包编译原理",
        "categories": ["JS高级", "webpack编译原理"]
    },
    {
        "id": "E001",
        "name": "jQuery",
        "rating": "3.9",
        "desc": "jQuery使用技巧",
        "categories": ["css高级", "dom操作"]
    },
    {
        "id": "E004",
        "name": "Canvas",
        "rating": "3.6",
        "desc": "Canvas使用技巧",
        "categories": ["css高级", "css动画"]
    },
    {
        "id": "E005",
        "name": "WebGL",
        "rating": "3.6",
        "desc": "Three.js使用技巧,WebGL应用",
        "categories": ["css高级", "3d动画"]
    }
];
const getList = () => {
    // 获取所有菜单，知识文件名称
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        // menulist = [...result]; // 缓存一份数据
        resolve(menulist)
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

const getDetail = (ID) => {
    // 第一步，通过menuid获取到菜单的文件
    // 第二步，通过id获取到此菜单下相应的文章，返回
    // console.log(menuid);
    // console.log('161行');
    // console.log(ID);
    const promise = new Promise((resolve, reject) => {
        // if (err) {
        //     reject(err)
        //     return
        // }
        const result = menulist.filter(i => i.id === ID);
        console.log(result);
        resolve(result[0]); // 返回第一个即可
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