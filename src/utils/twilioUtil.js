import axios from "axios";
import qs from "qs";

export function sendAppointmentMsg() {
    axios({
        method: 'post',
        url: 'https://api.twilio.com/2010-04-01/Accounts/ACea5c99928370228872ee5b680c648742/Messages.json',
        data: qs.stringify({
            To: 'whatsapp:+51948087589',
          From: 'whatsapp:+14155238886',
          Body: "test :v",
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        auth: {
            username: 'ACea5c99928370228872ee5b680c648742',
            password: '4496622eaa3ec1382c954341ce2debc4'
          }
      })
}
