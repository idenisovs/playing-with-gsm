import Modem from './Modem';
import log4js from './log4js';

const log = log4js.getLogger('run');

const modem = new Modem('/dev/ttyUSB0');

(async () => {
    await modem.connect();

    log.info('Requesting manufacturer....');

    const deviceInfo = await modem.getDeviceInformation();

    log.info(deviceInfo);

    await modem.disconnect();
})();

