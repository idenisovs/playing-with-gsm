class General {
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
}

export default class AT {
    static General = new General();
}