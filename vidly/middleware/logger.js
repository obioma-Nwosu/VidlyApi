function log(req, res, next){
  console.log('Logging...'); //perform our oprration and pass next
  next();
}

module.exports = log