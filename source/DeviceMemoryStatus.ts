export enum MemoryType {
    SIM = 'SIM',
    Device = 'Device'
}

export class MemorySlot {
    memory = MemoryType.SIM;
    used = 0;
    available = 0;

    constructor(props?: string[]) {
        if (!props) {
            return;
        }

        const [memory, used, available] = props;

        this.memory = memory === '"SM"' ? MemoryType.SIM : MemoryType.Device;
        this.used = Number(used);
        this.available = Number(available);
    }
}

export class DeviceMemoryStatus {
    raw: string;

    received = new MemorySlot();
    sent = new MemorySlot();
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

        this.received = new MemorySlot(parts.slice(0, 3));
        this.sent = new MemorySlot(parts.slice(3, 6));
        this.status = new MemorySlot(parts.slice(6, 9));
    }
}