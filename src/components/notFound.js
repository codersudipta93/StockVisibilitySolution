import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, local_images } from "../constants";

export const NotFound = ({ message = "Sorry! No Data Found", image = local_images.no_data }) => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Image
        source={local_images.placeholder}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 0,
    opacity:0.6
    //tintColor: theme.secondary, // Optional: can remove tint if image has color
  },
  text: {
    fontSize: sizes.bodyMedium,
    fontFamily: fontFamily.medium,
    color: theme.secondary,
    textAlign: "center",
  },
});


