import decodeUcs2 from '../decode-ucs2';

export class SMS {
    raw: string;
    status: string;
    phone: string;
    date: string;
    message: string;

    constructor(header: string, body: string) {
        this.raw = `${header}\r\n${body}`;

        const [ status, phone, unavailable, date ] = this.decodeHeader(header);

        this.status = status;
        this.phone = phone;
        this.date = date;
        this.message = decodeUcs2(body);
    }

    private decodeHeader(header: string) {
        const trimmedHeader = header.replace('+CMGR: ', '').replaceAll('"', '');
        return trimmedHeader.split(',');
    }
}