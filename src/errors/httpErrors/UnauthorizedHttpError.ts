// import HttpError from './HttpError';

// export default class NotFoundHttpError extends HttpError {
//   constructor(message: string) {
//     super({ message, status: 401 });
//   }
// }

import HttpError from './HttpError';

export default class UnauthorizedHttpError extends HttpError {
  constructor(message: string) {
    super({ message, status: 401 });
  }
}