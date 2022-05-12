import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return JSON.parse(value);
  } catch (error) {
    return false;
  }
};
