import decodeUcs2 from '../decode-ucs2';
import { MultipartMessage } from './MultipartMessage';
import { Encoding } from './Configuration';

export class SMS {
    raw: string;
    status: string;
    phone: string;
    date: string;
    message: string;

    constructor(raw: string, encoding = Encoding.GSM) {
        this.raw = raw;

        const [ status, phone, _, date, body ] = this.decodeHeader(raw);

        this.status = status;
        this.phone = phone;
        this.date = date;

        if (encoding === Encoding.GSM) {
            this.message = body;
        } else {
            this.message = decodeUcs2(body);
        }
    }

    private decodeHeader(header: string) {
        return header
            .replace('+CMGR: ', '')
            .replaceAll('"', '')
            .split(',');
    }

    static fromMultipartMessages(parts: (MultipartMessage|undefined)[]): SMS {
        const firstPart = parts[0] as MultipartMessage;

        const raw = `${firstPart.status},${firstPart.phone},,${firstPart.date}`;

        const messageParts: string[] = [];

        for (let idx = 0; idx < firstPart.parts; idx++) {
            const part = parts[idx];

            if (!part) {
                throw new Error(`Missing part ${idx} in seq ${firstPart.seq}!`);
            }

            messageParts.push(part.message);
        }

        const message = messageParts.join('');

        const sms = new SMS(`${raw},${message}`);
        sms.message = message;
        return sms;
    }
}