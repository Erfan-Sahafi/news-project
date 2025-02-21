const { default: mongoose, isValidObjectId } = require("mongoose");
const newsModel = require("../../models/news");

exports.createNews = async (req, res) => {
  try {
    const { newsTitle, newsBody, newsClass, viewCounter } = req.body;

    const news = await newsModel.create({
      newsTitle,
      newsBody,
      viewCounter,
      newsClass,
      cover: req.file.filename,
    });

    if (!news) {
      return res.status(403).json({ message: "news create error!" });
    }
    return res.status(201).json({
      message: "news create successfuly:)",
      news,
    });
  } catch (err) {
    return res.json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const news = await newsModel.find({}).lean();
    if (!news) {
      return res.status(403).json({
        message: "news get error!",
      });
    }
    return res.json({
      news,
    });
  } catch (err) {
    return res.json(err);
  }
};

exports.getByCategory = async (req, res) => {
  const { newsclass } = req.params;
  try {
    const news = await newsModel.find({ newsClass: newsclass }).lean();
    if (!news) {
      return res.status(403).json({
        message: "news get error!",
      });
    }
    return res.json({
      news,
    });
  } catch (err) {
    return res.json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await newsModel.findByIdAndUpdate(
      id,
      { $inc: { viewCounter: 1 } }, 
      { new: true }
    );

    if (!news) {
      return res.status(404).json({ message: "news not found!" });
    }
  
    return res.json({ news });
  } catch (err) {
    return res.json(err);
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { newsTitle, newsBody, viewCounter, newsClass } = req.body;
    if (isValidObjectId(id)) {
      const news = await newsModel.findByIdAndUpdate(
        id,
        {
          newsTitle,
          newsBody,
          viewCounter,
          newsClass,
          cover: req.file.filename,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!news) {
        return res.status(404).json({ message: "news id is not found!" });
      }
      return res.json({ message: "news remove successfuly:)", news });
    }
    return res.status(403).json({ message: "id is not valid!" });
  } catch (err) {
    return res.json(err);
  }
};

exports.removeNews = async (req, res) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const news = await newsModel.findByIdAndDelete(id);
      if (!news) {
        return res.status(404).json({ message: "news id is not found!" });
      }
      return res.json({ message: "news remove successfuly:)" });
    }
    return res.status(403).json({ message: "id is not valid!" });
  } catch (err) {
    return res.json(err);
  }
};
