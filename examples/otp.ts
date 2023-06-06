import Netgsm from "../index";
require("dotenv").config();

main();

//
//
//
//

async function main() {
  try {
    const api = new Netgsm({
      username: process.env.NETGSM_USERNAME,
      password: process.env.NETGSM_PASSWORD,
      msgheader: process.env.NETGSM_MSGHEADER,
    });

    const otpResponse = await api.otp(
      process.env.TEST_PHONE_NUMBER,
      `Test Message:  ${Math.floor(100000 + Math.random() * 900000)}`
    );

    console.log(otpResponse.jobID);
  } catch (error) {
    console.log({
      error: error.message,
      code: error.code,
    });
  }
}
