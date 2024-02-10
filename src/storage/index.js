import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalStorageItem = async (item) => {
    try {
        const value = await AsyncStorage.getItem(item);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (parseError) {
                // If parsing fails, means it is already string so return the original value
                return value;
            }
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const setLocalStorageItem = async (item, value) => {
    try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(item, serializedValue);
    } catch (error) {
        console.log("SetItem error ", error)
        return null;
    }
}

export const removeLocalStorageItem = async (item) => {
    try {
        await AsyncStorage.removeItem(item);
    } catch (error) {
        console.log("removeItemError error ", error)
        return null;
    }
}