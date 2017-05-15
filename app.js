var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var analyze = require('./routes/analyze');
var about = require('./routes/about');
var results = require('./routes/results');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/analyze', analyze);
app.use('/about', about);
app.use('/analyze/results', results);

app.post('/upload', function (req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

app.post('/analyze', function (req, res) {
    const spawn = require('child_process').spawn;
    const nistTest = spawn(path.join(__dirname, 'external_app', assess.exe), ['1111']);

    nistTest.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    nistTest.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    nistTest.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });

    nistTest.on('message', (message) => {
        console.log(message.toString());
    });

    nistTest.stdin.write('10000');

    nistTest.stdin.write(path.join(__dirname, 'uploads', data.txt));

    nistTest.stdin.write('');

    nistTest.stdout.pipe(process.stdout);

    nistTest.stdin.end();
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
