import iconv from 'iconv-lite';

export default function decodeUcs2(hex: string){
    try {
        const buffer = Buffer.from(hex, 'hex');
        return iconv.decode(buffer, 'utf16-be');
    } catch (e: any) {
        return `Decoding error ${e.message}`;
    }
}