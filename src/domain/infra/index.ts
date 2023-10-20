import AsyncStorage from "@react-native-async-storage/async-storage";

export class Infra {
  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      throw new Error("Error on get data from AsyncStorage");
    }
  }

  async set(key: string, value: string) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      throw new Error("Error on set data in AsyncStorage");
    }
  }

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new Error("Error on remove data from AsyncStorage");
    }
  }
}
