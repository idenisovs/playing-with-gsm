import { format } from 'util';

import log4js from './log4js';

import { Configuration, defaultConfig, Encoding, SmsMode, DeviceMemoryStatus, DeviceInformation, SMS } from './DTO';
import AT from './AT';
import Device from './Device';

const log = log4js.getLogger('modem')

export default class Modem extends Device {
    private config: Configuration;

    constructor(path: string, config: Configuration = defaultConfig) {
        super(path);

        this.config = config;
    }

    async connect() {
        await super.connect();
        await this.setup();
    }

    async configure(config: Configuration) {
        this.config = config;
        await this.setup();
    }

    async getDeviceInformation(): Promise<DeviceInformation> {
        log.debug('Requesting device information...');

        const result = new DeviceInformation();

        result.manufacturer = await this.run(AT.General.ManufacturerInformation);
        result.model = await this.run(AT.General.ModelIdentification);
        result.revision = await this.run(AT.General.RevisionIdentification);
        result.serial = await this.run(AT.General.DeviceSerialNumber);
        result.configuration = { ...this.config };

        return result;
    }

    async getSmsModeParams(): Promise<string> {
        log.debug('Requesting device text mode params...');

        return await this.run(AT.Config.RequestTextModeParams);
    }

    async sendSms(to: string, message: string) {
        log.debug('Sending SMS...');

        const command = format(AT.Sms.SendSMS, to);

        await this.run(command);
        await this.run(`${message}${String.fromCharCode(26)}`)
    }

    async readAllSms() {
        const memory = await this.readMemoryStatus();

        log.trace(memory);

        const result: SMS[] = [];

        for (let idx = 0; idx < memory.inbox.received; idx++) {
            const command = format(AT.Sms.ReadSMS, idx);
            const raw = await this.run(command);
            result.push(new SMS(raw));
        }

        return result;
    }

    async readMemoryStatus(): Promise<DeviceMemoryStatus> {
        const response = await this.run(AT.Sms.CheckMemoryStatus);
        log.trace(response);
        return new DeviceMemoryStatus(response);
    }

    private async setup() {
        await this.setupStorage();
        await this.setupEncoding();
        await this.setupSmsMode();
    }

    private async setupStorage() {
        log.debug('Setup modem storage!');
        log.debug('I will use SIM by default!');

        await this.run(AT.General.SetSmsStorageOnSIM);
    }

    private async setupEncoding() {
        log.debug('Setup modem encoding to %s!', this.config.encoding);

        switch (this.config.encoding) {
            case Encoding.GSM:
                await this.run(AT.Config.SetGsmEncoding);
                break;
            case Encoding.UCS2:
                await this.run(AT.Config.SetUcsEncoding);
                break;
            default:
                log.warn('Unknown encoding!');
        }
    }

    private async setupSmsMode() {
        log.debug('Running modem in %s mode!', this.config.mode === SmsMode.Text ? 'text' : 'PDU');

        switch (this.config.mode) {
            case SmsMode.Text:
                await this.run(AT.Config.SetTextMode)
                break;
            case SmsMode.PDU:
                await this.run(AT.Config.SetPduMode);
                break;
            default:
                log.warn('Unknown SMS mode!');
        }
    }
}