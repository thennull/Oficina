const { createOne } = require("../../ajax-client");

var id = global.newId();

var user = {
  _id: id,
  name: "Marcio Lage",
  email: "thennull.dev@gmail.com",
  password: "linuxbox",
  address: "Rua Santinho Linhares 159, Itabira, Minas Gerais 35901, BR",
  role: "usuario",
  phone: "21 97999-999",
};

describe("User Test Suite", function () {
  test("Create a User", async function () {
    let result = await createOne("users", user);
    expect(result).toEqual({
      success: true,
      data: {
        user: "Marcio Lage",
        email: "thennull.dev@gmail.com",
      },
    });
  });
});
