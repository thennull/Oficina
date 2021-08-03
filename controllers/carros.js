const Carro = require("../models/carros");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// Desc Fetch all carros
// Method GET
// Access Public

exports.getAllCarros = asyncHandler(async function (req, res, next) {
  var {
    select = "",
    sort = { marca: 1 },
    limit = 100,
    page = 1,
  } = req.run["extra"];
  delete req.run["extra"];
  var query = Carro.find(req.run);

  query.populate({
    path: "client",
    select: "name email",
  });

  if (select) {
    let fields = select.split(",").join(" ");
    query.select(fields);
  }

  (limit = Number.parseInt(limit)), (page = Number.parseInt(page));

  query.sort(sort);
  query.limit(limit);

  let totalDoc = await Carro.countDocuments().exec();
  let pagination = {
    limit,
    page,
    next: (page + 1) * limit <= totalDoc ? page + 1 : "",
    prev: page - 1 > 0 ? page - 1 : "",
  };

  query.skip((page - 1) * limit);
  let carros = await query.lean().exec();

  if (!carros)
    return next(
      new ErrorResponse("Could not find any 'carros' in database", null, 404)
    );

  res.status(200).json({
    success: true,
    count: carros.length,
    pagination,
    data: carros,
  });
});

// Desc Fetch all carros
// Method GET
// Access Public

exports.getOneCarro = asyncHandler(async function (req, res, next) {
  let id = req.params.carroId;
  let query = await Carro.findOne({ _id: id })
    .populate({ path: "client", select: "name email" })
    .lean()
    .exec();
  if (!query)
    return next(new ErrorResponse(`Could not find ID: ${id}`, null, 404));

  res.status(200).json({
    success: true,
    data: query,
  });
});

// Desc Update carro
// Method PUT
// Access Private

exports.putCarro = asyncHandler(async function (req, res, next) {
  let id = req.params.carroId;
  let body = { ...req.body };
  let { OS: newOS = [] } = req.body;
  delete body.OS;

  let carro = await Carro.findByIdAndUpdate(
    { _id: id },
    { ...body, $addToSet: { OS: { $each: newOS } } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .lean()
    .exec();

  res.status(200).json({
    success: true,
    data: carro,
  });
});

// Desc Create carro
// Method POST
// Access Private

exports.postCarro = asyncHandler(async function (req, res, next) {});

// Desc Delete carro
// Method DELETE
// Access Private

exports.delCarro = asyncHandler(async function (req, res, next) {});
