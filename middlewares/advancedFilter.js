const { asyncHandler } = require("../utils/asyncHandler");

exports.filterResults = asyncHandler(async function (req, res, next) {
  var query = undefined,
    run = undefined,
    extra = {};

  query = { ...req.query };
  ["select", "sort", "limit", "page"].forEach(function (value) {
    if (value in query) {
      if (value == "select") {
        extra[value] = query[value].split(",").join(" ");
      } else {
        extra[value] = query[value];
      }
      delete query[value];
    }
  });
  query = JSON.stringify(query);
  query = query.replace(/\b(gt|gte|lt|lte|in)\b/, function (match) {
    return `$${match}`;
  });

  run = JSON.parse(query);
  run.extra = extra;

  req["run"] = run;
  next();
});
