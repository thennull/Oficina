const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const Produto = require("../models/produtos");

// Desc Fetch all Produtos
// Method GET
// Access Public

exports.getProdutos = asyncHandler(async function (req, res, next) {
  let { select, sort, limit = 100, page = 1 } = req.run?.extra;
  delete req.run.extra;

  let query = Produto.find(req.run);

  query.select(select ?? "");

  query.sort(sort ?? "codigo");

  query.limit(Number.parseInt(limit));

  page = Number.parseInt(page);

  let totalDoc = await Produto.countDocuments().exec();
  let pagination = {
    limit,
    page,
    next: (page + 1) * limit <= totalDoc ? page + 1 : "",
    prev: page - 1 > 0 ? page - 1 : "",
  };

  query.skip((page - 1) * limit);

  let results = await query.lean().exec();

  res.status(200).json({
    success: true,
    count: results.length,
    pagination,
    data: results,
  });
});

// Desc Fetch one Produto
// Method GET
// Access Public

exports.getProduto = asyncHandler(async function (req, res, next) {
  let id = req.params.prodId;
  let prod = await Produto.findById(id).lean().exec();
  if (!prod)
    return next(new ErrorResponse("Could not find produto: " + id, null, 404));
  res.status(200).json({
    success: true,
    data: prod,
  });
});

// Desc Create a Produto
// Method POST
// Access Private

exports.postProduto = asyncHandler(async function (req, res, next) {
  let body = { ...req.body };
  let [{ codigo }] = await Produto.find({})
    .sort("-codigo")
    .select("codigo")
    .limit(1)
    .lean()
    .exec();

  if (codigo) body.codigo = Number.parseInt(codigo) + 1;

  let run = await Produto.create(body);
  if (!run)
    return next(new ErrorResponse("Failed to create produto!", null, 400));

  res.status(200).json({
    success: true,
    data: run,
  });
});

// Desc Update a Produto
// Method PUT
// Access Private

exports.putProduto = asyncHandler(async function (req, res, next) {
  let id = req.params.prodId;
  let body = { ...req.body };
  if (body.codigo) delete body.codigo;

  let prod = await Produto.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
    .lean()
    .exec();

  if (!prod)
    return next(new ErrorResponse("Could not find produto: " + id, null, 400));

  res.status(200).json({
    success: true,
    data: prod,
  });
});

// Desc Delete a Produto
// Method DELETE
// Access Private

exports.delProduto = asyncHandler(async function (req, res, next) {
  let id = req.params.prodId;
  let prod = await Produto.findById(id).exec();

  if (!prod)
    return next(new ErrorResponse("Could not find produto: " + id, null, 404));

  await prod.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
