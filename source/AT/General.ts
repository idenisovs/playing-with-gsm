export default class General {
    get ManufacturerInformation() {
        return 'AT+CGMI';
    }

    get ModelIdentification() {
        return 'AT+CGMM';
    }

    get RevisionIdentification() {
        return 'AT+CGMR';
    }

    get DeviceSerialNumber() {
        return 'AT+CGSN';
    }

    get SetSmsStorageOnSIM() {
        return 'AT+CPMS="SM","SM","SM"';
    }
}