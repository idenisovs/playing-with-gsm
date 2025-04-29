export enum SmsMode {
    PDU = 0,
    Text = 1
}

export enum Encoding {
    GSM="GSM",
    UCS2="UCS2"
}

export interface Configuration {
    encoding: Encoding;
    mode: SmsMode;
}

export const defaultConfig: Configuration = {
    encoding: Encoding.GSM,
    mode: SmsMode.Text
};