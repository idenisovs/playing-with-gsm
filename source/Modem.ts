import log4js from './log4js';
import AT from './AT';
import DeviceInformation from './DeviceInformation';
import Device from './Device';

const log = log4js.getLogger('modem')

export default class Modem extends Device {
    constructor(path: string) {
        super(path);
    }

    async getDeviceInformation(): Promise<DeviceInformation> {
        const result: DeviceInformation = {
            manufacturer: 'n/a',
            model: 'n/a',
            revision: 'n/a',
            serial: 'n/a'
        };

        log.debug('Requesting manufacturer...');

        result.manufacturer = await this.run(AT.General.ManufacturerInformation);
        result.model = await this.run(AT.General.ModelIdentification);
        result.revision = await this.run(AT.General.RevisionIdentification);
        result.serial = await this.run(AT.General.DeviceSerialNumber);

        return result;
    }
}