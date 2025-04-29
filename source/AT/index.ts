import Config from './Config';
import General from './General';
import SMS from './SMS';

export default class AT {
    static General = new General();
    static Config = new Config();
    static Sms = new SMS();
}