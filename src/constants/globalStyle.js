import { StyleSheet, Platform, PixelRatio, useWindowDimensions } from "react-native";

// ✅ Custom object with dynamic getters
export const device = {
  get width() {
    return useWindowDimensions().width;
  },
  get height() {
    return useWindowDimensions().height;
  },
};

// ✅ Platform Checks
export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

// ✅ iPhone X Detection
export const isIphoneX = 
  isIOS && ((device.height === 812 || device.width === 812) || 
            (device.height === 896 || device.width === 896));

// ✅ Status Bar Style
export const BarStyle = isIOS ? "dark-content" : "light-content";

// ✅ Dynamic Styles
export const defaultStyle = (width) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "flex-start",
      
    },
    headerTitle: {
      fontSize: PixelRatio.getFontScale() * (isAndroid ? 18 : 16),
      color: "white",
      width: width * 0.9, // Responsive width
    },
  });
