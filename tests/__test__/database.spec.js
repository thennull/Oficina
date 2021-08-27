const { expect } = require("@jest/globals");

var { user } = global.servData;

var { User, Carro, Produto, Servico } = global.models;

describe("User model interations", function () {
  var id = global.newId();

  test("Add a user", async function () {
    await User.create({ _id: id, ...user, password: "testPassword" });
    expect(
      await User.findOne({ _id: id }).select("+password").lean().exec()
    ).toEqual({
      _id: id,
      ...user,
      password: expect.anything(),
      location: {
        city: "Itabira",
        coordinates: [-43.23753, -19.64241],
        country: "BR",
        formattedAddress:
          "Rua Santinho Linhares 159, Itabira, Minas Gerais 35900, BR",
        state: "Minas Gerais",
        street: "Rua Santinho Linhares 159",
        type: "Point",
        zipcode: "35900",
      },
      role: "client",
      createdAt: expect.anything(),
      __v: 0,
    });
  });

  test("Update a user", async function () {
    let role = "usuario";
    let response = await User.findByIdAndUpdate(
      { _id: id },
      { role },
      { new: true, runValidators: true }
    )
      .lean()
      .exec();
    expect(response.role).toBe(role);
  });

  test("delete a user", async function () {
    await User.deleteOne({ _id: id }).exec();

    expect(await User.countDocuments()).toBe(0);
  });
});
