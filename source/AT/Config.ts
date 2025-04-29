import { Encoding, SmsMode } from '../DTO';

export default class General {
    get RequestTextModeParams() {
        return 'AT+CMGF=?';
    }

    get SetTextMode() {
        return `AT+CMGF=${SmsMode.Text}`;
    }

    get SetPduMode() {
        return `AT+CMGF=${SmsMode.PDU}`;
    }

    get GetCurrentEncoding() {
        return 'AT+CSCS?';
    }

    get SetGsmEncoding() {
        return `AT+CSCS="${Encoding.GSM}"`;
    }

    get SetUcsEncoding() {
        return `AT+CSCS="${Encoding.UCS2}"`;
    }
}