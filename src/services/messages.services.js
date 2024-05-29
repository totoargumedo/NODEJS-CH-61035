//MONGO MESSAGE DAO
import MessageDaoMongo from "../dao/mongo/messages.dao.js";
const messagesDao = new MessageDaoMongo();

//get all messages
export const getAll = async () => {
  try {
    const messages = await messagesDao.getAll();
    if (!messages) return false;
    else return messages;
  } catch (error) {
    throw new Error(error);
  }
};

//get message by id
export const getById = async (id) => {
  try {
    const message = await messagesDao.getById(id);
    if (!message) return false;
    else return message;
  } catch (error) {
    throw new Error(error);
  }
};

//create message
export const create = async (data) => {
  try {
    const newMessage = await messagesDao.create(data);
    if (!newMessage) return false;
    else return newMessage;
  } catch (error) {
    throw new Error(error);
  }
};

//remove message by id
export const remove = async (id) => {
  try {
    const message = await messagesDao.remove(id);
    if (!message) return false;
    else return message;
  } catch (error) {
    throw new Error(error);
  }
};
