import { SerialPort } from 'serialport';
import log4js from './log4js';

const log = log4js.getLogger('device')

export default class Device {
    protected readonly path: string;
    protected readonly port: SerialPort;

    constructor(path: string) {
        this.path = path;
        this.port = new SerialPort({
            path: this.path,
            baudRate: 9600,
            autoOpen: false
        });
    }

    connect(): Promise<void> {
        log.debug('Connecting to %s...', this.path);

        return new Promise((resolve, reject) => {
            this.port.open((error: any) => {
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

            this.port.close(((error: any) => {
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

    run(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.port.isOpen) {
                return reject(`Device ${this.path} is not connected!`);
            }

            log.debug('Running command %s...', command);

            const accumulator: string[] = [];

            this.port.on('data', (response: Buffer) => {
                const raw = response.toString();

                log.trace([raw]);

                raw.split(/[\r\n]/).forEach((entry: string) => {
                    if (entry && entry.trim().length > 0) {
                        accumulator.push(entry.trim());
                    }
                });

                const lastEntry = accumulator[accumulator.length - 1];

                if (lastEntry === 'OK' || (lastEntry && lastEntry.indexOf('ERROR') > -1) || lastEntry === '>') {
                    this.port.removeAllListeners('data');

                    if (lastEntry === 'OK' || lastEntry === '>') {
                        accumulator.pop();
                        resolve(accumulator.join(' '));
                    } else {
                        log.error(lastEntry);
                        reject(lastEntry);
                    }
                }
            });

            this.port.write(`${command}\r\n`, ((error: any) => {
                if (error) {
                    log.error(error);
                    this.port.removeAllListeners('data');
                    reject(error);
                }
            }));
        });
    }
}