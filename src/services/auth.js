import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

// Check trong db email gửi lên đã tồn tại hay chưa. Bảng user trong db chỉ cho đăng ký bằng email
// Nếu đã tồn tại trả về một message rằng email đã đc đăng ký
// Nếu email chưa có trong db => đăng ký cho email này
export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // User: modelName trong model
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });

      // response[1]: false email đã được sử dụng rồi
      // response[1]: true tạo mới
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is successfully" : "Email already exists",
        token,
      });
      resolve({
        err: 0,
        mes: "Register ss",
        'access_token': token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });

      const isChecked = response && bcrypt.compareSync(password, response.password)

      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        mes: token ? "Login is successfully" : response ? 'Wrong password' : 'Email not found',
        'access_token': token ? `Bearer ${token}` : null,
      });
      resolve({
        err: 0,
        mes: "Register ss",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });
