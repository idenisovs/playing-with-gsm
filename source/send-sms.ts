import { ReadlineParser, SerialPort } from 'serialport';
import Readline from '@serialport/parser-readline';

const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 115200
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendCommand(cmd: string, pause = 100) {
    console.log(cmd);
    port.write(cmd + '\r');
    await delay(pause);
}

function toUCS2(str: string) {
    return Buffer.from(str, 'ucs2').toString('hex').toUpperCase();
}

async function sendSms(phoneNumber: string, message: string) {
    port.on('data', (data) => {
        console.log(`< ${data}`);
    });

    await sendCommand('AT');
    await sendCommand('AT+CMGF=1'); // Set to text mode
    await sendCommand('AT+CSCS="UCS2"'); // Use UCS2 character set for Unicode
    await sendCommand('AT+CSMP=17,167,0,8'); // Set message parameters (UCS2 encoding)
    await sendCommand(`AT+CMGS="${toUCS2(phoneNumber)}"`);

    await delay(500);

    port.write(toUCS2(message) + String.fromCharCode(26)); // Ctrl+Z to send
}

sendSms('26745606', 'Hello world!').then(() => {
    console.log('OK');
})