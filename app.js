var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // log 日志插件
const session = require('express-session'); // 直接就存储session了
// const RedisStore = require('connect-redis')(session);

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const loginRouter = require('./routes/login');
const fileRouter = require('./routes/uploader');
const wpcTechRouter = require('./routes/wpcbookmarks');

var app = express();

// 设置处理跨域
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// view engine setup; 前后端不分离时使用（视图引擎设置）
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') { // 开发环境 / 测试环境
  app.use(logger('dev')); // 使用日志
} else {
  // 线上环境, 写入日志
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', { // 线上环境使用
    stream: writeStream // 写入流写入文件
  }))
}


// app.use(express.json()); // 类似getPostData，处理post请求的数据转成json格式
// app.use(express.urlencoded({ extended: false })); // 处理兼容表单提交格式x-www-form-urlencoded

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 可以再试试connect-multiparty，multiparty


app.use(cookieParser()); // 解析cookie
// 使用redis，存储session(注意参数使用及传递)
/* 一直并未好使
    const redisClient = require('./db/redis.js');
    const sessionStore = new RedisStore({
      host : "127.0.0.1",
      port : "6379",
      client: redisClient,
    });
*/
app.use(session({ // 每执行一个http请求，自动生成一个session
  // store: sessionStore, // redis直接放在session的store中使用,
  secret: 'WPC#841222_',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24*60*60*1000
  }
}));
// app.use(express.static(path.join(__dirname, 'public')));

// 两个路径会进行拼接，父子路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter); 
app.use('/api/blog', blogRouter);
app.use('/api/user', loginRouter);
app.use('/api/file', fileRouter);
app.use('/api/wpcTechSummary', wpcTechRouter); // 汇总基础常用知识

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // 无访问路径，返回404
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  console.log(err.status);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
