import Modem from './Modem';
import log4js from './log4js';
import { Encoding, SmsMode } from './DTO';

const log = log4js.getLogger('run');

const modem = new Modem('/dev/ttyUSB0', {
    mode: SmsMode.PDU,
    encoding: Encoding.UCS2
});

(async () => {
    try {
        await modem.connect();

        // log.info('Requesting device information....');

        // const deviceInfo = await modem.getDeviceInformation();

        // log.info(deviceInfo);

        const sms = await modem.readAllSms();

        log.info(sms);

    } catch (error) {
        log.error(error);
    } finally {
        await modem.disconnect();
    }
})();

