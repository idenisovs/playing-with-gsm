import { Deliver, parse } from 'node-pdu';

export class MultipartMessage {
    private static counter = 0;

    raw: string;

    id = ++MultipartMessage.counter;
    status = 'empty';
    size = 0;

    ref = 0;
    seq = 0;
    parts = 1;

    phone = '';
    date = '';
    message = '';

    constructor(raw: string) {
        this.raw = raw;

        const parts = this.getMessageParts(raw);

        this.decodeMeta(parts);

        const pdu = parse(parts[4]) as Deliver;

        this.decodeHeader(pdu);
        this.decodeMessage(pdu);
    }

    private getMessageParts(raw: string) {
        const trimmed = raw.replace('+CMGR: ', '');
        const parts = trimmed.split(',');

        if (parts.length === 4) {
            parts.unshift(String(this.id));
        }

        return parts;
    }

    private decodeMeta(parts: string[]) {
        const [ id, status, _, size ] = parts;

        this.id = Number(id);
        this.status = status === '1' ? 'read' : 'unread';
        this.size = Number(size);
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
        this.phone = pdu.address.phone || '';
        this.message = pdu.data.getText();
    }
}