import Modem from './Modem';
import log4js from './log4js';

const log = log4js.getLogger('run');

const modem = new Modem('/dev/ttyUSB0');

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

