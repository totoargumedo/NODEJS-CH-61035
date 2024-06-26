export default class UsersDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async register(user) {
    try {
      const { email } = user;
      const existUser = await this.model.findOne({ email });
      if (existUser) return { error: "User already registered" };
      const newUser = await this.model.create(user);
      if (!newUser) return { error: "Error creating user" };
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email, password) {
    try {
      const existUser = await this.model.findOne(
        { email, password },
        { _id: 0, password: 0, __v: 0 }
      );
      if (!existUser) return { error: "User or password incorrect" };
      return existUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const existUser = await this.model.findOne({ email });
      if (!existUser) return false;
      return existUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
