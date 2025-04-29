export enum MemoryType {
    SIM = 'SIM',
    Device = 'Device'
}

export class MemorySlot {
    memory = MemoryType.SIM;
    received = 0;
    capacity = 0;

    constructor(props?: string[]) {
        if (!props) {
            return;
        }

        const [memory, received, capacity] = props;

        this.memory = memory === '"SM"' ? MemoryType.SIM : MemoryType.Device;
        this.received = Number(received);
        this.capacity = Number(capacity);
    }
}

export class DeviceMemoryStatus {
    raw: string;

    inbox = new MemorySlot();
    outbox = new MemorySlot();
    status = new MemorySlot();

    constructor(raw: string) {
        this.validate(raw);
        this.raw = raw;
        this.processRawInput(raw);
    }

    validate(raw: string) {
        if (!raw.startsWith('+CPMS')) {
            throw new Error('Not CPMS type record!');
        }
    }

    private processRawInput(raw: string) {
        const trimmed = raw.replace('+CPMS: ', '');

        const parts: string[] = trimmed.split(',');

        this.inbox = new MemorySlot(parts.slice(0, 3));
        this.outbox = new MemorySlot(parts.slice(3, 6));
        this.status = new MemorySlot(parts.slice(6, 9));
    }
}