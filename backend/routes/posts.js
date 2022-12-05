var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    const { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, status, other_info, origin_url } = req.body

});

module.exports = router;
