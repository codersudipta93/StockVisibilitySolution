import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes } from "../constants";

export const SearchBarWithLoader = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleSearch = async () => {
   //alert(query)
    return await onSearch(query)
    // if (query)return;
    // setLoading(true);
    // await onSearch(query); // Call parent function
    // setLoading(false);
    
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={theme.white}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.white} size="small" />
        ) : (
          <Text style={styles.buttonText}>Search</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};



const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      paddingHorizontal: 25,
      marginTop:4
    },
    input: {
      flex: 1,
      height: 48,
      backgroundColor: theme.primaryDark || "#f0f0f0",
      borderRadius: 8,
      paddingHorizontal: 12,
      color: theme.white,
      fontFamily: fontFamily.regular,
      borderWidth:1,
      borderColor:"#f0f0f0",
      
    },
    button: {
      marginLeft: 10,
      paddingHorizontal: 20,
      height: 45,
      backgroundColor: theme.primary,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.white,
      fontSize: sizes.buttonText,
      fontFamily: fontFamily.medium,
    },
  });
