const User = require("../models/users");
const Carro = require("../models/carros");
const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");

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
    var user = await User.findOne({ _id: id }).exec();
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
  }).exec();

  if (!user)
    return next(ErrorResponse(`could not update user: ${id}`, null, 500));

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

  let user = await User.findByIdAndDelete(id).exec();
  if (!user)
    return next(ErrorResponse(`could not update user: ${id}`, null, 404));

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
        link: `${process.env.SERVER}:3000/api/v1/users/newpassword/${key}`,
      },
    });
});
