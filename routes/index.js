var Artist = require("../models/artist");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // var arto = new Artist({
  //   title: "Test",
  //   description: "test",
  //   gsm: "555",
  //   url: "http://www.google.com",
  //   properties: { allowBack: true },
  //   status: { isDeleted: false, isUnavaliable: false }
  // });
  // arto.save(function(err) {
  //   if (err) return console.log(err);
  //   // saved!
  // });


  Artist.find(function(err, content) {    
    res.render("index", { title: "Test", contents: content });
  });
});

module.exports = router;
