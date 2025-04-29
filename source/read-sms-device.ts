import { format } from 'node:util';

import log4js from './log4js';
import Device from './Device';
import AT from './AT';
import { DeviceMemoryStatus, MultipartMessage, SMS } from './DTO';

const log = log4js.getLogger('run');

// const modem = new Modem('/dev/ttyUSB0', {
//     mode: SmsMode.Text,
//     encoding: Encoding.UCS2
// });

const device = new Device('/dev/ttyUSB0');

(async () => {
    try {
        await device.connect();
        await device.run(AT.Config.SetPduMode);

        const memoryStatusRaw = await device.run(AT.Sms.CheckMemoryStatus);
        const memory = new DeviceMemoryStatus(memoryStatusRaw);

        log.trace(memory);

        const multipartMessages: MultipartMessage[] = [];

        for (let idx = 0; idx < memory.inbox.received; idx++) {
            const raw = await device.run(format(AT.Sms.ReadSMS, idx));
            multipartMessages.push(new MultipartMessage(raw));
        }

        const sms: SMS[] = [];
        const messageGroups: Record<number, MultipartMessage[]> = {};

        for (let part of multipartMessages) {
            if (!part.ref) {
                sms.push(SMS.fromMultipartMessages([part]))
                continue;
            }

            if (!messageGroups[part.ref]) {
                messageGroups[part.ref] = [];
            }

            messageGroups[part.ref][part.seq-1] = part;
        }

        for (let group in messageGroups) {
            sms.push(SMS.fromMultipartMessages(messageGroups[group]));
        }

        log.trace(sms)
    } catch (error) {
        log.error(error);
    } finally {
        await device.disconnect();
    }
})();

