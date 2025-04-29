export default class SMS {
    get SendSMS() {
        return `AT+CMGS="%s"`
    }

    get GetAllSMS() {
        return 'AT+CMGL="ALL"';
    }

    get ReadSMS() {
        return `AT+CMGR=%d`;
    }

    get CheckMemoryStatus() {
        return 'AT+CPMS?';
    }
}