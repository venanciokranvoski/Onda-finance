import { MMKV } from 'react-native-mmkv';
import { Storage } from '../storage';

const MMKVInstanceCriptOnda = new MMKV();

export const MMKVStorage: Storage = {
    getItem: (key) => {
        const item = MMKVInstanceCriptOnda.getString(key);
        if(item){
            return JSON.parse(item);
        }
        return null;
    },
    setItem: async <T>(key: string, value: T ) => {
        MMKVInstanceCriptOnda.set(key, JSON.stringify(value));
    },
    removeItem: async key => MMKVInstanceCriptOnda.delete(key)
}