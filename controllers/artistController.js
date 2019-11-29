var ArtistModel = require("../models/artist");
var axios = require("axios");
/**
 * artistController.js
 *
 * @description :: Server-side logic for managing artists.
 */
module.exports = {
  /**
   * artistController.list()
   */
  list: function(req, res) {
    const page = req.query.page;
    const limit = 500; //req.query.limit;

    console.log(req.query);
    ArtistModel.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ name: "asc" })
      .exec(function(err, artists) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting artist.",
            error: err
          });
        }
        return res.render("artist/index", {
          title: "Artist List",
          artists: artists
        });
      });
  },

  collect: (req, res) => {
    axios
      .get("https://randomuser.me/api/?results=500&nat=tr&noinfo")
      .then(resp => {
        //console.log(resp.data.results);
        resp.data.results.map((value, index, arr) => {
          //console.log(value);
          console.log(index);
          //console.log(arr);
          var artistModel = new ArtistModel();
          artistModel.title = `${value.name.title} ${value.name.first} ${value.name.last}`;
          artistModel.url = `${value.picture.large}`;
          artistModel.description = `${value.location.timezone.description}`;
          artistModel.gsm = `${value.cell}`;
          artistModel.properties.allowBack = false;
          artistModel.properties.location = value.location.street.name;
          artistModel.properties.price = 300;
          artistModel.status.isDeleted = false;
          artistModel.status.isUnavaliable = false;
          artistModel.status.isTrans = false;

          artistModel.save((err, doc) => {
            if (err) {
              console.log(err);
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * artistController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    ArtistModel.findOne({ _id: id }, function(err, artist) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting artist.",
          error: err
        });
      }
      if (!artist) {
        return res.status(404).json({
          message: "No such artist"
        });
      }
      return res.render("artist/detail", artist);
    });
  },

  editView: function(req, res) {
    var id = req.params.id;    
    ArtistModel.findOne({ _id: id }, function(err, artist) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting artist.",
          error: err
        });
      }
      if (!artist) {
        return res.status(404).json({
          message: "No such artist"
        });
      }
      return res.render("artist/edit", artist);
    });
  },

  /**
   * artistController.create()
   */

  createView: function(req, res) {
    return res.render("artist/create", { title: "Artist List" });
  },

  create: function(req, res) {
    console.log(req.body);
    var body_temp = req.body;
    if (body_temp.properties.allowBack) {
      body_temp.properties.allowBack = true;
    } else {
      body_temp.properties.allowBack = false;
    }
    if (body_temp.status.isDeleted) {
      body_temp.status.isDeleted = true;
    } else {
      body_temp.status.isDeleted = false;
    }
    if (body_temp.status.isUnavaliable) {
      body_temp.status.isUnavaliable = true;
    } else {
      body_temp.status.isUnavaliable = false;
    }

    var artist = new ArtistModel(req.body);

    artist.save(function(err, artist) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating artist",
          error: err
        });
      }
      return res.redirect("detail/" + artist._id);
    });
  },

  /**
   * artistController.update()
   */
  update: function(req, res) {    
    var id = req.params.id;
    ArtistModel.findOne({ _id: id }, function(err, artist) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting artist",
          error: err
        });
      }
      if (!artist) {
        return res.status(404).json({
          message: "No such artist"
        });
      }

       var newArtist = new ArtistModel(req.body);
      // console.log(req.body)
       //artist = newArtist;
       //artist._id = req.params.id;
       console.log(artist);
       console.log(newArtist);

      

      artist.save(function(err, artist) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating artist.",
            error: err
          });
        }

        return res.json(artist);
      });
    });
  },

  /**
   * artistController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    ArtistModel.findByIdAndRemove(id, function(err, artist) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the artist.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
