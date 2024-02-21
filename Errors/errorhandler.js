exports.handlePSQLErrors =  (err, req, res, next) => {
    if(err.code === '22P02'){
      res.status(400).send({msg:'Bad Request!'})
    }next(err)
    if(err.code === '23503'){
      res.status(404).send({msg: 'User not found.'})
    }
  }

  exports.handleCustomErrors = (err, req, res, next) => {
      if(err.status && err.msg){
      res.status(err.status).send({ msg: err.msg })}
      next(err);
  }