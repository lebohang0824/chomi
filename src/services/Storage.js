import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

export default class Storage {
    static async set(key, value) {
        try {
            const res = await RNSecureKeyStore.set(key, value, { 
                accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY 
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    static async get(key) {
        try {
            const res = await RNSecureKeyStore.get(key);
            return res;
        } catch (err) {
            return false;
        }
    }

    static async remove(key) {
        try {
            const res = await RNSecureKeyStore.remove(key);
            return true;
        } catch (err) {
            return false;
        }
    }
}