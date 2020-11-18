import { format } from 'util';
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
        log.debug('Requesting device information...');

        const result: DeviceInformation = {
            manufacturer: 'n/a',
            model: 'n/a',
            revision: 'n/a',
            serial: 'n/a'
        };


        result.manufacturer = await this.run(AT.General.ManufacturerInformation);
        result.model = await this.run(AT.General.ModelIdentification);
        result.revision = await this.run(AT.General.RevisionIdentification);
        result.serial = await this.run(AT.General.DeviceSerialNumber);

        return result;
    }

    async getSmsModeParams(): Promise<string> {
        log.debug('Requesting device text mode params...');

        return await this.run(AT.Sms.RequestTextModeParams);
    }

    async setTextMode(): Promise<void> {
        log.debug('Setting device in text mode...');

        await this.run(AT.Sms.SetTextMode);
    }

    async setGsmEncoding(): Promise<void> {
        log.debug('Setting device encoding to GSM...');

        await this.run(AT.Sms.SetGsmEncoding);
    }

    async sendSms(to: string, message: string) {
        log.debug('Sending SMS...');

        const command = format(AT.Sms.SendSMS, to);

        await this.run(command);
        await this.run(`${message}${String.fromCharCode(26)}`)
    }
}