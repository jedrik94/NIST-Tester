var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('analyze', {title: 'NIST Tester'});
    var name = req.params.name,
        format = req.params.name;
    console.log(name + " : " + format);

});

module.exports = router;