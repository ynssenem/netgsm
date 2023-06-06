class NetgsmException extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "NetgsmException";
    this.code = code;
  }
}

export default NetgsmException;
