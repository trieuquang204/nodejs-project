// const router = require('express').Router()

// router('/', (req, res) => {
//   return res.send('Sever onnnn')
// })



// module.exports = router // Viết kiểu này là export default

// // module.exports = { // Viết kiểu export thường
// //   router
// // }


// const user = require('./user');
import user from './user';
import auth from './auth';
import { notFound } from '../middlewares/handle_errors';

const initRoutes = (app) => {

  app.use('/api/v1/user', user)
  app.use('/api/v1/auth', auth)

  // return app.use('/', (req, res) => {
  //   return res.send('Server onnn')
  // })
  app.use(notFound)
}


module.exports = initRoutes