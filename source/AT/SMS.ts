export default class SMS {
    get SendSMS() {
        return `AT+CMGS="%s"`
    }

    get GetAllInGSM() {
        return 'AT+CMGL="ALL"';
    }

    get GetAllInPDU() {
        return 'AT+CMGL=4'
    }

    get ReadSMS() {
        return `AT+CMGR=%d`;
    }

    get CheckMemoryStatus() {
        return 'AT+CPMS?';
    }
}