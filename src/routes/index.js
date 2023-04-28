// const router = require('express').Router()

// router('/', (req, res) => {
//   return res.send('Sever onnnn')
// })



// module.exports = router // Viết kiểu này là export default

// // module.exports = { // Viết kiểu export thường
// //   router
// // }


const user = require('./user');

const initRoutes = (app) => {

  app.use('/api/v1/user', user)

  return app.use('/', (req, res) => {
    return res.send('Server onnn')
  })
}


module.exports = initRoutes