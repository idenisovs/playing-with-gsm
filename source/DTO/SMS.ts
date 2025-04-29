import decodeUcs2 from '../decode-ucs2';

export class SMS {
    raw: string;
    status: string;
    phone: string;
    date: string;
    message: string;

    constructor(raw: string) {
        this.raw = raw;

        const [ status, phone, _, date, body ] = this.decodeHeader(raw);

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