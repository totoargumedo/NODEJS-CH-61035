import * as usersServices from "../services/users.services.js";

export const register = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await usersServices.register(user);
    if (newUser.error)
      return res.status(403).redirect("/errors/register-error");
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Hardcodeo de admin coder
    if (email === "adminCoder@coder.com" || password === "adminCod3r123") {
      req.session.user = {
        first_name: "Admin Coder",
        age: 1000,
        role: "admin",
      };
      return res.status(200).redirect("/");
    }
    const loggedUser = await usersServices.login(email, password);
    if (loggedUser.error)
      return res.status(403).redirect("/errors/login-error");
    else {
      req.session.user = loggedUser;
      return res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).redirect("/");
  } catch (error) {
    next(error);
  }
};
