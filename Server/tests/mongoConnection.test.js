process.env.CONNECTDB_URL = "mongodb://fake-url";

jest.mock("mongoose", () => ({
  connect: jest.fn(() => Promise.resolve()),
  model: jest.fn(),
  Schema: jest.fn()
}));

jest.mock("dotenv", () => ({
  config: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

test("mongoose.connect is called with DB URL", () => {
  // 🔑 clear module cache so auth.js runs again
  jest.resetModules();

  const mongoose = require("mongoose");

  require("../schema")

  expect(mongoose.connect).toHaveBeenCalledWith(
    process.env.CONNECTDB_URL
  );
});