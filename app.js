const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Routers
const rootRouter = require('./routes/index');
const contactMessageRouter = require('./routes/contact-message');
const playStoreRouter = require('./routes/play-store');
const getContentRouter = require('./routes/get-content');
const serverErrorRouter = require('./routes/server-error');
const cattyRouter = require('./routes/catty');
const adminRouter = require('./routes/admin');

// API
const deleteMessage = require('./routes/api/delete-message');
const markMessage = require('./routes/api/mark-message');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);
app.use('/contact-message', contactMessageRouter);
app.use('/playstore', playStoreRouter);
app.use('/get-content', getContentRouter);
app.use('/server-error', serverErrorRouter);
app.use('/catty', cattyRouter);
app.use('/yttac', adminRouter);

app.use('/delete-message', deleteMessage);
app.use('/mark-message', markMessage);

// catch 404 and forward to error handler
app.use((req, res) => {
  // next(createError(404));
  res.status(404);
  res.render('404');
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500');
});

module.exports = app;
