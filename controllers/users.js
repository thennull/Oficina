const User = require("../models/users");
const Carro = require("../models/carros");
const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const crypto = require("crypto");

// Desc fetch all users
// Method GET
// Access Public

exports.getUsers = asyncHandler(async function (req, res, next) {
  let users = undefined,
    query = req.run;

  if ("extra" in query) {
    var { select = "", sort = "", limit = 100, page = 1 } = query["extra"];
    delete query["extra"];
  }

  query = User.find(query);
  if (select) query.select(select);
  if (sort) query.sort(sort);
  else query.sort({ name: 1 });

  query.populate({
    path: "carros",
    select: "marca modelo",
  });

  (limit = Number.parseInt(limit)), (page = Number.parseInt(page));

  query.limit(limit);
  let totalDoc = await User.countDocuments().exec();
  let pagination = {
    limit,
    page,
    next: (page + 1) * limit <= totalDoc ? page + 1 : "",
    prev: page - 1 > 0 ? page - 1 : "",
  };

  query.skip((page - 1) * limit);

  users = await query.lean().exec();

  if (!users)
    return next(
      new ErrorResponse("Could not find any user in our base", null, 400)
    );

  res.status(200).json({
    success: true,
    count: users.length,
    pagination,
    data: users,
  });
});

// Desc create a user
// Method POST
// Access Private

exports.postUser = asyncHandler(async function (req, res, next) {
  let user = await User.create(req.body);

  if (!user) {
    return next(new ErrorResponse(`Could not create that user.`, null, 400));
  }

  res.status(200).json({
    success: true,
    data: {
      user: user.name,
      email: user.email,
    },
  });
});

// Desc Fetch one user by ID
// Method GET
// Access Public

exports.getOneUser = asyncHandler(async function (req, res, next) {
  let id = req.params.userId;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    var user = await User.findOne({ _id: id }).lean().exec();
    if (!user) {
      return next(
        new ErrorResponse("Could not find any user with ID: " + id, null, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    return next(new ErrorResponse(`Invlaid ID: ${id}`, null, 400));
  }
});

// Desc Update a user by ID
// Method PUT
// Access Private

exports.updateUser = asyncHandler(async function (req, res, next) {
  let id = req.params.userId;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(ErrorResponse(`Invalid ID: ${id}`, null, 400));
  let user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  })
    .lean()
    .exec();

  if (!user)
    return next(ErrorResponse(`Could not update user: ${id}`, null, 500));

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Desc Delete a user by ID
// Method Delete
// Access Private

exports.deleteUser = asyncHandler(async function (req, res, next) {
  let id = req.params.userId;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(ErrorResponse(`Invalid ID: ${id}`, null, 400));

  let user = await User.deleteOne({ _id: id }).exec();

  if (!user)
    return next(ErrorResponse(`Could not delete user: ${id}`, null, 404));

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Desc Request a password reset
// Method GET
// Access Public

exports.getResetLink = asyncHandler(async function (req, res, next) {
  let id = req.params.userId;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(ErrorResponse(`Invalid ID: ${id}`, null, 400));
  let user = await User.findOne({ _id: id }).exec();
  if (!user)
    return next(ErrorResponse(`could not update user: ${id}`, null, 404));
  let key = user.resetPasswd();
  let token = user.signJWT("600s");
  await user.save();
  res
    .status(200)
    .cookie("resetToken", token, { httpOnly: true })
    .json({
      success: true,
      data: {
        link: `${process.env.SERVER}:3000/api/v1/users/${id}/${key}`,
      },
    });
});

// Desc Update user's password
// Method PUT
// Access Private

exports.putPassword = asyncHandler(async function (req, res, next) {
  let id = req.params.userId,
    key = req.params.key,
    { password } = req.body;

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(new ErrorResponse(`ID: ${id} is invalid`, null, 400));

  let user = await User.findOne({ _id: id }).select("+password").exec();

  if (!user)
    return next(new ErrorResponse(`Could not find ID: ${id}`, null, 404));

  if (user.resetPwdExpire < Date.now()) {
    return next(new ErrorResponse(`Access expired for: ${id}`, null, 401));
  }

  let counterTest = crypto.createHash("sha256").update(key).digest("hex");

  if (counterTest != user.resetPwd)
    return next(new ErrorResponse(`Invalid access for: ${id}`, null, 401));

  user.password = password;

  (user.resetPwd = ""), (user.resetPwdExpire = "");

  await user.save();

  res.status(200).cookie("resetToken", null, { httpOnly: true }).json({
    success: true,
    data: {},
  });
});

// Desc Login a user
// Method POST
// Access Public

exports.userLogin = asyncHandler(async function (req, res, next) {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email }).select("+password").exec();
  if (!user)
    return next(new ErrorResponse(`User not found: ${email}`, null, 404));
  if (!(await user.validatePasswd(password)))
    return next(new ErrorResponse(`User not authorized: ${email}`, null, 401));
  res
    .status(200)
    .cookie("token", user.signJWT("24h"), { httpOnly: true })
    .json({
      success: true,
      data: {
        logged: true,
      },
    });
});

// Desc Logoff a user
// Method GET
// Access Pirvate

exports.userLogoff = asyncHandler(async function (req, res, next) {
  res
    .status(200)
    .cookie("token", "", { httpOnly: true })
    .json({
      success: true,
      data: {
        logoff: true,
      },
    });
});
