const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const Servico = require("../models/servicos");

// Desc Fetch all servicos
// Method GET
// Access Public

exports.getAllServicos = asyncHandler(async function (req, res, next) {
  let serv = undefined,
    query = req.run;

  if ("extra" in query) {
    var { select = "", sort = "", limit = 100, page = 1 } = query["extra"];
    delete query["extra"];
  }

  query = Servico.find(query);
  if (select) query.select(select);
  if (sort) query.sort(sort);
  else query.sort({ codigo: 1 });

  (limit = Number.parseInt(limit)), (page = Number.parseInt(page));

  query.limit(limit);
  let totalDoc = await Servico.countDocuments().exec();
  let pagination = {
    limit,
    page,
    next: (page + 1) * limit <= totalDoc ? page + 1 : "",
    prev: page - 1 > 0 ? page - 1 : "",
  };

  query.skip((page - 1) * limit);

  serv = await query.lean().exec();

  if (!serv)
    return next(
      new ErrorResponse("Could not find any user in our base", null, 400)
    );

  res.status(200).json({
    success: true,
    count: serv.length,
    pagination,
    data: serv,
  });
});

// Desc Fetch one servico
// Method GET
// Access Public

exports.getOneServico = asyncHandler(async function (req, res, next) {
  let id = req.params.servId;

  if (!id.match(/^[a-zA-Z0-9]{24}$/))
    return next(new ErrorResponse(`Invalid ID: ${id}`, null, 400));

  let serv = await Servico.findOne({ _id: id }).lean().exec();
  if (!serv)
    return next(new ErrorResponse("Could not find ID: " + id, null, 404));

  res.status(200).json({
    success: true,
    data: serv,
  });
});

// Desc Update servico
// Method PUT
// Access Private

exports.updateServico = asyncHandler(async function (req, res, next) {
  let body = req.body,
    id = req.params.servId;

  if (!id.match(/^[0-9a-zA-Z]{24}$/))
    return next(new ErrorResponse(`Invalid ID: ${id}`, null, 400));

  let serv = await Servico.findOneAndUpdate({ _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .lean()
    .exec();

  if (!serv)
    return next(new ErrorResponse(`Could not update: ${id}`, null, 400));

  res.status(200).json({
    success: true,
    data: serv,
  });
});

// Desc Create servico
// Method POST
// Access Private

exports.createServico = asyncHandler(async function (req, res, next) {});

// Desc Delete servico
// Method DELETE
// Access Private

exports.deleteServico = asyncHandler(async function (req, res, next) {});
