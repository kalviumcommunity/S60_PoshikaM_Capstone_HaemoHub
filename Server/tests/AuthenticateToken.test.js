process.env.SECRET = "testsecret";

// 👇 MOCK FIRST
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

// 👇 THEN require
const jwt = require("jsonwebtoken");
const AuthenticateToken = require("../auth");

describe("AuthenticateToken middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {},
      headers: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test("returns 401 if no token is provided", () => {
    AuthenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "no token provided"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 403 if token is invalid", () => {
    req.cookies.token = "fakeToken";

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    AuthenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid token"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next and sets req.user if token is valid", () => {
    const mockUser = { id: 1, role: "admin" };
    req.cookies.token = "validToken";

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    AuthenticateToken(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});