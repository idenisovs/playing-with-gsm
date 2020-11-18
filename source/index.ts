import Modem from './Modem';

const modem = new Modem('/dev/ttyUSB0');

(async () => {
    await modem.connect();

    await modem.disconnect();
})();

