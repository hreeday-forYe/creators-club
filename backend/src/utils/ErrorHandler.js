class ErrorHandler extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;

// constructor(
//   statusCode,
//   message = 'Something Went Wrong',
//   errors = [],
//   stack = ''
// ) {
//   super(message);
//   (this.statusCode = statusCode),
//     (this.data = null),
//     (this.message = message),
//     (this.success = false),
//     (this.errors = errors);

//   if (stack) {
//     this.stack = stack;
//   } else {
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
