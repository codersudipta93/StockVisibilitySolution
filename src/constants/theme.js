export const colors = {
  primary: "#4aa399", // 🔴 Brown red
  secondary: "#c09374", // ✅ Keeping green as secondary
  error: "#FF3B30", // 🔴 Error Red
  warning: "#FF9500", // 🟠 Warning Orange
  success: "#004f0d", // 🟢 Success Green
  info: "#003fa3",   // 🔵 Info Blue
  
  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  lightGray: "#c2c2c2",
  darkGray: "#3A3A3C",

  // Additional Shades of Primary
  primaryMedium: "#32b5a6", // Lighter variant of primary (for soft UI)
  primaryDark: "#014c43", // Darker variant of primary (for text/icons)
  primaryLight:'#ffc9d1',
  secondaryLight:"#dbbf78"
};

export const lightTheme = {
  mode: "light",
  text: colors.black,
  primary: colors.primary,
  primaryMedium: colors.primaryMedium,
  primaryDark: colors.primaryDark,
  primaryLight:colors.primaryLight,
  secondary: colors.secondary,
  secondaryLight: colors.secondaryLight,
  border: colors.lightGray,
  lightGray:colors.lightGray,
  card: "#F9F2EE",
  white:'#fff',
  black:'#000',
  success:colors.success,
  info:colors.info,
  warning:colors.warning,
  error:colors.error
};

export const darkTheme = {
  mode: "dark",
  text: colors.black,
  primary: colors.primary,
  primaryMedium: colors.primaryMedium,
  primaryDark: colors.primaryDark,
  primaryLight:colors.primaryLight,
  secondary: colors.secondary,
  secondaryLight: colors.secondaryLight,
  border: colors.lightGray,
  lightGray:colors.lightGray,
  card: "#F9F2EE",
  white:'#fff',
  black:'#000',
  success:colors.success,
  info:colors.info,
  warning:colors.warning,
  error:colors.error
};



export const fontFamily = {
  regular: 'OutfitRegular',
  bold: 'OutfitBold',
  medium: 'OutfitMedium',
  semibold: 'OutfitSemiBold',
};


export const sizes = {
  titleLarge: 32,
  titleMedium: 28,
  titleSmall: 24,
  subtitle: 20,
  bodyLarge: 18,
  bodyMedium: 16, 
  bodyDeafult: 14,// ✅ Default Font Size
  bodySmall: 13, // ✅ Added for extra small text
  caption: 12,
  buttonText: 15, // Button text
};

