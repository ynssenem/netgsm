import axios, { Axios } from "axios";
import { js2xml, xml2js } from "xml-js";
import {
  OTPResultErrorInterface,
  OTPResultInterface,
} from "../interfaces/OTPInterface";
import NetgsmException from "../exceptions/NetgsmException";
import { NetgsmSuccessInterface } from "../interfaces/NetgsmInterface";

type NetgsmProps = {
  username: string;
  password: string;
  msgheader: string | number;
};

class Netgsm {
  protected axios: Axios;
  protected config: NetgsmProps;

  constructor(config: NetgsmProps) {
    this.config = config;
    this.axios = axios.create({
      baseURL: "https://api.netgsm.com.tr",
    });
  }

  public async otp(
    phoneNumber: string,
    message: string
  ): Promise<NetgsmSuccessInterface> {
    const endpoint = "/sms/send/otp";
    const axios = await this.axios;
    const data = {
      _declaration: { _attributes: { version: "1.0" } },
      mainbody: {
        header: {
          ...this.getAuth(),
        },
        body: {
          msg: `<![CDATA[${message}]]>`,
          no: phoneNumber,
        },
      },
    };

    const xml = js2xml(data, {
      compact: true,
      ignoreComment: true,
      spaces: 4,
      ignoreDeclaration: false,
    });

    const request = await axios.post(endpoint, xml, {
      headers: this.getAxiosXmlHeaders(),
    });

    const response = xml2js(request.data, {
      compact: true,
      nativeType: true,
      ignoreComment: true,
      alwaysChildren: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
    }) as OTPResultInterface;

    const result = response.xml.main;

    if ("error" in result && result.code._text !== 0) {
      throw new NetgsmException(result.error._text, result.code._text);
    }

    return {
      jobID: result.jobID._text,
    };
  }

  protected getAuth() {
    return {
      usercode: this.config.username,
      password: this.config.password,
      msgheader: this.config.msgheader,
    };
  }

  protected getAxiosXmlHeaders() {
    return {
      "Content-Type": "application/xml",
    };
  }
}

export default Netgsm;
