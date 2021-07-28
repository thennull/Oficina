const User = require("../models/users");
const Carro = require("../models/carros");
const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async function (req, res, next) {
  let users = undefined,
    query = req.run;

  if ("extra" in query) {
    var { select = "", sort = "" } = query["extra"];
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

  users = await query.exec();

  if (!users)
    return next(
      new ErrorResponse("Could not find any user in our base", null, 400)
    );

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
