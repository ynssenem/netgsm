export interface OTPResultInterface {
  xml: {
    main: OTPResultErrorInterface &
      OTPCodeInterface &
      OTPResultSuccessInterface;
  };
}

export interface OTPResultErrorInterface {
  error: {
    _text: string;
  };
}

export interface OTPCodeInterface {
  code: {
    _text: number;
  };
}

export interface OTPResultSuccessInterface {
  jobID: {
    _text: number;
  };
}
