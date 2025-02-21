const express = require("express");
const newsController = require("../../controllers/v1/news");
const authMid = require("../../middlewares/auth");
const isAdminMid = require("../../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const router = express.Router();

router
  .route("/")
  .get(newsController.getAll)
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single(
      "cover"
    ),
    authMid,
    isAdminMid,
    newsController.createNews
  );

router.route("/newsclass/:newsclass").get(newsController.getByCategory);
router
  .route("/:id")
  .get(newsController.getOne)
  .delete(authMid, isAdminMid, newsController.removeNews)
  .put(
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single(
      "cover"
    ),
    authMid,
    isAdminMid,
    newsController.updateNews
  );

module.exports = router;
