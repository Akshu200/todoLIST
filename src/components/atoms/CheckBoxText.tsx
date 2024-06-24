import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { CheckBox } from "react-native-elements";

interface checkboxProp {
  checked: boolean;
  onClick: Function;
  title: String;
  touchableStyle?: TextStyle;
  textStyle?: TextStyle;
}
const CheckBoxText = (props: checkboxProp) => {
  return (
    <>
      {typeof props.onClick === "function" &&
        typeof props.checked === "boolean" &&
        typeof props.title === "string" && (
          <TouchableOpacity
            onPress={props?.onClick}
            style={[styles.touchableStyle, props.touchableStyle]}
          >
            <CheckBox checked={props?.checked} disabled={true} />
            <Text style={[styles.textStyle, props.textStyle]}>
              {props?.title}
            </Text>
          </TouchableOpacity>
        )}
    </>
  );
};

export default memo(CheckBoxText);

const styles = StyleSheet.create({
  touchableStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "grey",
    marginVertical: 5,
  },
  textStyle: { fontSize: 15, fontWeight: "bold",color:'black'  },
});
