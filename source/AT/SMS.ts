import { SmsMode } from './SmsMode';

export default class SMS {
    get RequestTextModeParams() {
        return 'AT+CMGF=?';
    }

    get SetTextMode() {
        return `AT+CMGF=${SmsMode.Text}`;
    }

    get SetPduMode() {
        return `AT+CMGF=${SmsMode.PDU}`;
    }

    get SendSMS() {
        return `AT+CMGS="%s"`
    }

    get GetCurrentEncoding() {
        return 'AT+CSCS?';
    }

    get SetGsmEncoding() {
        return 'AT+CSCS="GSM"';
    }
}