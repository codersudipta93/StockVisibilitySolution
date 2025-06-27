import { View, Text, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, device, local_images } from "../constants"; // Import font constants
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CustomButton = (props) => {
    const { toggleTheme, isDark, theme } = useTheme();
    return (
        <TouchableOpacity onPress={props.onPress} style={[{ backgroundColor: props.backgroundColor ? props.backgroundColor : '#F1592A', borderRadius: 4, alignItems: 'center', justifyContent: 'center', height: props?.height ? props.height : 55, borderWidth: props.requireBorder ? 1 : 0, borderColor: props.borderColor ? props.borderColor : null }, props.style]}>
            {props.isLoading == true ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={theme.white} />
                    <Text style={[{ fontFamily: fontFamily.regular, color: theme.white, fontSize: sizes.buttonText, textAlign: 'center', textTransform: 'capitalize', marginLeft: 4 }]}>
                        Please Wait...
                    </Text>
                </View>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {props.requireIcon ?
                        props.simbolType == 'image' ?
                            <Image
                                style={props.iconStyle}
                                source={props.icon}
                            />
                            :
                            <Icon
                                name={props.icon}
                                size={28}
                                color={theme.white}
                            />
                        : null}

                    <Text style={[{ fontFamily: fontFamily.medium, color: theme.white, fontSize: sizes.buttonText, textAlign: 'center', textTransform: 'uppercase' }, props.buttonTextStyle]}>
                        {props.buttonText}
                    </Text>
                </View>

            }
        </TouchableOpacity >
    )
}

