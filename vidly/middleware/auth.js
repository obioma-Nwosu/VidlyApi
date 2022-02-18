function authenticator(req, res, next){
  console.log('Auth...'); //perform our oprration and pass next
  next();
}
module.exports = authenticator