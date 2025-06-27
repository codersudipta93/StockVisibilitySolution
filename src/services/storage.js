import { MMKV } from 'react-native-mmkv';

// Initialize MMKV with encryption
const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: '123456', // Replace with a secure key
});

// Function to store data securely
const setData = (key, value) => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Function to retrieve data securely
const getData = (key) => {
  try {
    const value = storage.getString(key); // MMKV stores all data as strings
    return value;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Function to delete a specific item securely
const deleteData = (key) => {
  try {
    storage.delete(key);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Function to clear all stored data securely
const clearAllData = () => {
  try {
    storage.clearAll();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export { setData, getData, deleteData, clearAllData };
