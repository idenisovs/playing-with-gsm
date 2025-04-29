import Modem from './Modem';
import log4js from './log4js';
import { Encoding, SmsMode } from './DTO';

const log = log4js.getLogger('run');

const modem = new Modem('/dev/ttyUSB0', {
    mode: SmsMode.Text,
    encoding: Encoding.UCS2
});

(async () => {
    try {
        await modem.connect();
        const sms = await modem.readAllSms();
        log.trace(sms);
    } catch (error) {
        log.error(error);
    } finally {
        await modem.disconnect();
    }
})();

