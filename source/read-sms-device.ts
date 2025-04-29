import { format } from 'node:util';
import { Deliver, parse } from 'node-pdu';

import log4js from './log4js';
import Device from './Device';
import AT from './AT';
import { DeviceMemoryStatus, MultipartMessage } from './DTO';

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

        const sequences = new Map<string, string[]>();

        const messages: MultipartMessage[] = [];

        for (let idx = 0; idx < memory.inbox.received; idx++) {
            const raw = await device.run(format(AT.Sms.ReadSMS, idx));
            messages.push(new MultipartMessage(raw, idx + 1));
        }

        log.trace(messages);

        // const [header, body] = await device.run(format(AT.Sms.ReadSMS, 0), true);
        // const sms = new SMS(header, body);
        // // log.trace(sms);
        //
        // const parsed = parse(body) as Deliver;
        //
        // log.trace(parsed.address.phone);
        // log.trace(parsed.data.getText());
        // log.trace(parsed.serviceCenterTimeStamp.getIsoString());
        //
        // const udh = parsed.getParts()[0].header
        //
        // if (udh) {
        //     log.trace(udh.toJSON());
        // }



        // const raw = await device.run(AT.Sms.GetAllPDUSMS, true);
        // log.trace(raw);
    } catch (error) {
        log.error(error);
    } finally {
        await device.disconnect();
    }
})();

