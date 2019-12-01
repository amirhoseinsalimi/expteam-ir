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
const getContentRouter = require('./routes/get-content');
const serverErrorRouter = require('./routes/server-error');
const cattyRouter = require('./routes/catty');
const adminRouter = require('./routes/admin');

// RESTful API
const deleteMessage = require('./routes/api/delete-message');
const markMessage = require('./routes/api/mark-message');
const getMember = require('./routes/api/get-member');
const addMember = require('./routes/api/add-member');
const deleteMember = require('./routes/api/delete-member');
const updateMember = require('./routes/api/update-member');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('bethesmartestpersomintheroot'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', rootRouter);
app.use('/contact-message', contactMessageRouter);
app.use('/get-content', getContentRouter);
app.use('/server-error', serverErrorRouter);
app.use('/catty', cattyRouter);
app.use('/yttac', adminRouter);

// RESTful API
app.use('/delete-message', deleteMessage);
app.use('/mark-message', markMessage);
app.use('/get-member', getMember);
app.use('/add-member', addMember);
app.use('/delete-member', deleteMember);
app.use('/update-member', updateMember);

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
