import { Deliver, parse } from 'node-pdu';

export class MultipartMessage {
    raw: string;

    id: number;
    status: string;
    size: number;

    ref = 0;
    seq = 0;
    parts = 0;

    phone: string | null = null;
    date = '';
    message = '';

    constructor(raw: string, idx = 1) {
        this.raw = raw;

        const trimmed = raw.replace('+CMGR: ', '');
        const parts = trimmed.split(',');

        if (parts.length === 4) {
            parts.unshift(String(idx));
        }

        const [ id, status, _, size, body ] = parts;

        this.id = Number(id);
        this.status = status === '1' ? 'read' : 'unread';
        this.size = Number(size);

        const pdu = parse(body) as Deliver;

        this.decodeHeader(pdu);
        this.decodeMessage(pdu);
    }

    private decodeHeader(pdu: Deliver) {
        const part = pdu.getParts().shift();

        if (!part) {
            return;
        }

        const header = part.header;

        if (!header) {
            return;
        }

        this.ref = header.getPointer() || 0;
        this.seq = header.getCurrent() || 0;
        this.parts = header.getSegments() || 0;
    }

    private decodeMessage(pdu: Deliver) {
        this.date = pdu.serviceCenterTimeStamp.getIsoString();
        this.phone = pdu.address.phone;
        this.message = pdu.data.getText();
    }
}