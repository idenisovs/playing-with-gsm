import Modem from './Modem';
import log4js from './log4js';

const log = log4js.getLogger('run');

const modem = new Modem('/dev/ttyUSB0');

(async () => {
    try {
        await modem.connect();

        log.info('Requesting device information....');

        const deviceInfo = await modem.getDeviceInformation();

        log.info(deviceInfo);
    } catch (error) {
        log.error(error);
    } finally {
        await modem.disconnect();
    }
})();

