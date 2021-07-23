const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodeGeocoder = require("node-geocoder");

// Model setup

var geocoder = nodeGeocoder({
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "GaIFjX7X3mAOPSIdhyNAdtIAEcolzYzV",
  formatter: null,
});

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Insire um nome"],
  },
  email: {
    type: String,
    required: [true, "Insira um email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Insira um email valido",
    ],
  },
  password: {
    type: String,
    required: [true, "Insira um password"],
    minLength: 6,
    select: false,
  },
  address: {
    type: String,
    required: [true, "Insira um endereço"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  phone: {
    type: String,
    required: [true, "Insira um numero de telefone"],
  },
  gender: String,
  resetPwd: {
    type: String,
  },
  resetPwdExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["usuario", "client"],
    default: "usuario",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.signJWT = function () {
  return jwt.sign({ id: this._id }, proccess.env.JWT_SECRET, {
    expiresIn: proccess.env.JWT_EXPIRE,
  });
};

UserSchema.methods.validatePasswd = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.resetPasswd = function () {
  let key = crypto.randomBytes(30).toString("hex");
  this.resetPasswd = crypto.createHash("sha256").update(key).digest("hex");
  this.resetPwdExpire = Date.now() + 600000;
  return key;
};

UserSchema.pre("save", async function (next) {
  // Format to query: 'Rua Gameleira 83, Itabira, Minas Gerais 35901, BR'
  let loc = await geocoder.geocode(this.address);
  loc = loc[0];
  this.location = {
    type: "Point",
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress,
    street: loc.streetName,
    city: loc.city,
    state: loc.stateCode,
    zipcode: loc.zipcode,
    country: loc.countryCode,
  };

  this.address = null;
  next();
});

module.exports = mongoose.model("User", UserSchema);
