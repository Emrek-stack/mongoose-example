var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var artist = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  gsm: { type: String, required: true },
  properties: {
    allowBack: { type: Boolean, required: true, default: false },
    location: { type: String, required: true, default: "" },
    price: { type: Number, required: false },
    lastCallDate: { type: Date, required: false },
    callCount: { type: Number, required: false }
  },
  status: {
    isDeleted: { type: Boolean, required: true, default: false },
    isUnavaliable: { type: Boolean, required: true, default: false },
    isTrans: { type: Boolean, required: true, default: false }
  },
  images: [
    {
      image: { data: Buffer, contentType: String, required: false }
    }
  ]
});

module.exports = mongoose.model("Artist", artist);
