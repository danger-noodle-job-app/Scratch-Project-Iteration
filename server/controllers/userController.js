

const userController = {
  isLoggedIn(req, res, next){
    // return req.user ? next() : res.sendStatus(401);
    return next();
  },

  saveUser(req, res, next){
    return next();
  }
}



module.exports = userController;