const bcrypt = require("bcrypt");
const userModel = require("../../models/user");
const banUserModel = require("../../models/banUser");
const registerValidator = require("../../validators/register");
const jwt = require("jsonwebtoken");

// register user controller
exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);
  // check with fastest-validator
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }
  // get user info from request body
  const { username, email, password } = req.body;
  // check user exsist or not
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      massage: "username,email is duplicated.",
    });
  }
  // check user is ban or not
  const isUserBan = await banUserModel.find({ email });
  if (isUserBan.length) {
    return res.status(409).json({ message: "this email is ban." });
  }

  const countOfUsers = await userModel.countDocuments();
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObj = user.toObject();
  Reflect.deleteProperty(userObj, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "30 day",
  });

  res.status(201).json({ user: userObj, accessToken });
};

// login user controller
exports.login = async (req, res) => {
  const { email , password } = req.body;

  // const user = await userModel.findOne({
  //   $or: [{ email: identifire }, { username: identifire }]
  // });
  const user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "there is not user with this username!" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "password is not valid!" });
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "30 day",
  });
  return res.status(200).json({ user,accessToken });
};

// get user info controller
exports.getMe = async (req, res) => {
  try {
    const user = await userModel
      .findById({ _id: req.user._id })
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    return res.json({ user });
  } catch (err) {
    return res.json(err);
  }
};
