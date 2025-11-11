import * as Crypto from 'expo-crypto';
import { encode as base64Encode, decode as base64Decode } from 'base-64';

const KEY = '123'; 

export async function encryptText(text: string): Promise<string> {
    const base64 = base64Encode(text);
    return base64.split('').reverse().join('');
    }

    export function decryptText(encrypted: string): string {
    const base64 = encrypted.split('').reverse().join('');
    return base64Decode(base64);
}