import UsersDaoMongo from "../dao/mongo/users.dao.js";
import { UserModel } from "../dao/mongo/models/user.model.js";

const usersDao = new UsersDaoMongo(UserModel);

export const register = async (user) => {
  try {
    return await usersDao.register(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (email, password) => {
  try {
    return await usersDao.login(email, password);
  } catch (error) {
    throw new Error(error);
  }
};
