import SerialPort from 'serialport';
import log4js from './log4js';

const log = log4js.getLogger('modem')

export default class Modem {
    private readonly path: string;
    private readonly port: SerialPort;

    constructor(path: string) {
        this.path = path;
        this.port = new SerialPort(this.path, {
            autoOpen: false
        });
    }

    connect(): Promise<void> {
        log.debug('Connecting to %s...', this.path);

        return new Promise((resolve, reject) => {
            this.port.open(error => {
                if (error) {
                    log.error(error);
                    return reject(error);
                }

                log.debug('Connected!');

                resolve();
            })
        });
    }

    disconnect(): Promise<void> {
        log.debug('Disconnecting from %s...', this.path);

        return new Promise((resolve, reject) => {
            if (!this.port) {
                return resolve();
            }

            this.port.close((error => {
                if (error) {
                    log.error(error);
                    reject(error);
                } else {
                    log.debug('Disconnected!');
                    resolve();
                }
            }));
        });
    }
}