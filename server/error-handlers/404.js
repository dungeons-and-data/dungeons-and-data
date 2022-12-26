'use strict';

function handle404(req, res, next) {

  const errorObject = {
    status: 500,
    message: 'Not Found!',
  };
  res.status(404).json(errorObject);

}
module.exports = handle404;