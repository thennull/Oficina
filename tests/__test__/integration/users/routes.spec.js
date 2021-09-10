const logger = require("../../logger");
const {
  createUser,
  fetchOne,
  updateUser,
  deleteUser,
} = require("../../ajax-client");

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

var mockUser = {
  body: {
    ...user,
  },
};

var locationFormatted = {
  type: "Point",
  coordinates: [-43.23753, -19.64241],
  formattedAddress:
    "Rua Santinho Linhares 159, Itabira, Minas Gerais 35900, BR",
  street: "Rua Santinho Linhares 159",
  city: "Itabira",
  state: "Minas Gerais",
  zipcode: "35900",
  country: "BR",
};

beforeEach(function () {
  return jest.spyOn(logger, "logInfo").mockImplementation(jest.fn);
});

afterEach(function () {
  return logger.logInfo.mockClear();
});

describe("User Test Suite", function () {
  test("Create a User", async function () {
    let result = await createUser("users", user);

    var [first] = logger.logInfo.mock.calls[0];
    expect(logger.logInfo.mock.calls).toHaveLength(1);

    expect(JSON.stringify(first)).toEqual(JSON.stringify(mockUser));

    expect(result).toEqual({
      success: true,
      data: {
        user: "Marcio Lage",
        email: "thennull.dev@gmail.com",
      },
    });
  });

  test("Validate mongoose location middleware", async function () {
    let result = await fetchOne("users/", id);
    expect(result.data.location).toEqual(locationFormatted);
  });

  test("Update a user", async function () {
    let result = await updateUser("users/", id, { role: "client" });
    expect(result.data.role).toBe("client");
  });

  test("Delete a user", async function () {
    let result = await deleteUser("users/", id);
    expect(result.success).toBe(true);
  });
});
