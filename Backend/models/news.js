const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    newsTitle: {
      type: String,
      required: true,
    },
    newsBody: {
      type: String,
      required: true,
    },
    newsClass: {
      type: String,
      required: true,
    },
    viewCounter: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("news", schema);

module.exports = model;
