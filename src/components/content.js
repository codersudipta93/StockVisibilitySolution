// import React from 'react';
// import { View, KeyboardAvoidingView } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export const Content = ({ style, children }) => {
//     return (
//         <KeyboardAwareScrollView
//             automaticallyAdjustContentInsets={false}
//             showsVerticalScrollIndicator={true}
//             keyboardShouldPersistTaps="handled"
//             enableOnAndroid={true} // ✅ Ensures smooth scrolling on Android
//             extraScrollHeight={Platform.OS === 'ios' ? 20 : 0} // ✅ Helps avoid keyboard overlap on iOS
//             contentContainerStyle={[
//                 {
//                     flexGrow: 1, // ✅ Ensures responsiveness but allows scrolling

//                 }
//             ]}
//         >
//             {/* <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                 style={{ flex: 1 }}
//             > */}
//                 <View style={[{ flex: 1},style]}>
//                     {children}
//                 </View>
//             {/* </KeyboardAvoidingView> */}
//         </KeyboardAwareScrollView>
//     );
// };


import React from 'react';
import { View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Content = ({ style, children }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </View>
        // <KeyboardAwareScrollView
        //     automaticallyAdjustContentInsets={false}
        //     showsVerticalScrollIndicator={true}
        //     keyboardShouldPersistTaps="handled"
        //     enableOnAndroid={true}
        //     enableAutomaticScroll={true} // ✅ Prevents unwanted jumping
        //     extraHeight={Platform.OS === 'ios' ? 80 : 50} // ✅ Helps adjust for the keyboard
        //     resetScrollToCoords={{ x: 0, y: 0 }} // ✅ Prevents unintended scrolling
        //     contentContainerStyle={[
        //         {
        //             flexGrow: 1, // ✅ Ensures the view grows dynamically
        //             justifyContent: 'center', // ✅ Keeps content centered
        //         },
        //         style,
        //     ]}
        // >
        //     <View>{children}</View>
        // </KeyboardAwareScrollView>
    );
};
