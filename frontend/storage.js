// storage.js
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import localStorage from 'localStorage';

const isWeb = Platform.OS === 'web';

const storage = {
    setItem: async (key, value) => {
        if (isWeb) {
            await localStorage.setItem(key, value);
        } else {
            await AsyncStorage.setItem(key, value);
        }
    },
    getItem: async (key) => {
        if (isWeb) {
            return await localStorage.getItem(key);
        } else {
            return await AsyncStorage.getItem(key);
        }
    },
    removeItem: async (key) => {
        if (isWeb) {
            await localStorage.removeItem(key);
        } else {
            await AsyncStorage.removeItem(key);
        }
    },
    clear: async () => {
        if (isWeb) {
            await localStorage.clear();
        } else {
            await AsyncStorage.clear();
        }
    }
};

export default storage;
