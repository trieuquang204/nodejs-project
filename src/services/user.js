import db from "../models";

// Lấy thông tin môt user theo id của nó
export const getOne = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['password']
        }
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "User not found!",
        userData: response
      });
    } catch (error) {
      reject(error);
    }
  });