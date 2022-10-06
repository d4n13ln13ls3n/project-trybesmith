interface HttpErrorParams {
  message: string;
  status: number;
}

export default class HttpError extends Error {
  public status: number;

  constructor({ message, status }: HttpErrorParams) {
    super(message);
    this.status = status;
  }
}