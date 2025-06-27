import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import { fontFamily, sizes, device, local_images } from "../constants"; // Import font constants
import { useTheme } from "../constants/themeProvider";

export const CustomSelectInput = ({
  control,
  name,
  placeholder = "Select option",
  data = [],
  rules = {},
  iconLeft,
  inputTextColor,
  placeholderTextColor,
  borderColor,
  errorBorderColor,
  errorTextColor,
  iconColor,
  bgColor,
  modalBgColor = "#fff",
  modalInputBorderColor,
  modalOptionLabelColor,
  modalOptionBorderColor,
  modalSearchPlaceholderColor,
  modalSearchTextColor,
  height
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { toggleTheme, isDark, theme } = useTheme();
  
  const filterData = (items) => {
    if (!searchText) return items;
    return items.filter((item) =>
      (typeof item === "string" ? item : item?.label)
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
    );
  };

  const renderItem = (item, onChange, value) => {
    const label = typeof item === "string" ? item : item?.label;
    const isSelected = value === item || value?.label === item?.label;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { borderBottomColor: modalOptionBorderColor || "#ccc" },
        ]}
        onPress={() => {
          onChange(item);
          setModalVisible(false);
        }}
      >
        <Text
          style={{
            color: modalOptionLabelColor,
            fontWeight: isSelected ? "bold" : "normal",
            fontFamily:fontFamily.regular
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.inputContainer,
              {
                backgroundColor: bgColor,
                borderColor: value ? theme.white : borderColor,
                marginBottom: error ? 0 : 20,
                height: height ? height : 48
              },
            ]}
          >
            {iconLeft && <View style={styles.icon}>{iconLeft}</View>}

            <Text
              style={{
                color: value ? inputTextColor : placeholderTextColor,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {typeof value === "string"
                ? value
                : value?.label || placeholder}
            </Text>

            <Icon name="chevron-down-outline" size={20} color={value ? theme.white :iconColor} />
          </TouchableOpacity>

          {error && (
            <Text style={{ color: errorTextColor, fontSize: 12, marginTop: 6, marginBottom: error ? 20 : 0}}>
              {error.message}
            </Text>
          )}

          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View
                style={[styles.modalContent, { backgroundColor: modalBgColor }]}
              >
                <View
                  style={[
                    styles.searchRow,
                    { borderColor: modalInputBorderColor },
                  ]}
                >
                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search"
                    placeholderTextColor={
                      modalSearchPlaceholderColor || placeholderTextColor
                    }
                    style={[
                      styles.searchInput,
                      {
                        color: modalSearchTextColor || inputTextColor,
                        fontFamily:fontFamily.regular
                      },
                    ]}
                  />
                  {!!searchText && (
                    <TouchableOpacity onPress={() => setSearchText("")}>
                      <Icon name="close-circle" size={20} color={iconColor} />
                    </TouchableOpacity>
                  )}
                </View>

                <FlatList
                  data={filterData(data)}
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={({ item }) => renderItem(item, onChange, value)}
                  keyboardShouldPersistTaps="handled"
                />

                <TouchableOpacity
                  style={[styles.modalCloseBtn,{borderColor:modalInputBorderColor,borderWidth:1}]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: modalInputBorderColor,fontFamily:fontFamily.medium }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth:1,
    
    
    //marginVertical: 6,
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  modalCloseBtn: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
