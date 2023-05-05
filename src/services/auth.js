import db from '../models';
import bcrypt from 'bcryptjs';


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

// Check trong db email gửi lên đã tồn tại hay chưa. Bảng user trong db chỉ cho đăng ký bằng email
// Nếu đã tồn tại trả về một message rằng email đã đc đăng ký
// Nếu email chưa có trong db => đăng ký cho email này
export const register = ({email, password}) => new Promise(async (resolve, reject) => {
  try {
    // User: modelName trong model
    const response = await db.User.findOrCreate({
      where: {email},
      defaults: {
        email,
        password: hashPassword(password)
      }
    })

    console.log(response)
    resolve({
      err: response[1] ? 0 : 1,
      mes: response[1] ? 'Register is successfully' : 'Email already exists'
    })
  } catch (error) {
    reject(error)
  }
})