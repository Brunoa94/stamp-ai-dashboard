type ResponseCodeType = 200;
type ErrorCodeType = 500;

type ErrorStatusTypes = "SOMETHING_WENT_WRONG";

export type ErrorType = {
  status: ErrorCodeType;
  error: {
    id: ErrorStatusTypes;
    message: string;
  };
};

export type GlobalResponseType<T> = {
  status: ResponseCodeType;
  body: T;
};
