declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NETGSM_USERNAME: string;
    readonly NETGSM_PASSWORD: string;
    readonly NETGSM_MSGHEADER: string;
    readonly TEST_PHONE_NUMBER: string;
  }
}
