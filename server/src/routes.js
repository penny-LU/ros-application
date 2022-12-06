const AuthenticationController = require('./controller/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const DownloadController = require('./controller/DownloadController')

module.exports = (app) => {
  // const sock_list = [] ;
  // app.post('/register', (req, res) => {
  //   res.send({
  //     message: `${req.body.email}  ${req.body.password}`
  //   })
  // })
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )

  app.post('/login',
    AuthenticationController.login)
}
