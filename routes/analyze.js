var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('analyze', {title: 'NIST Tester'});
});

module.exports = router;