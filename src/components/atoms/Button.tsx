import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
interface button {
  onClick: Function;
  text: string;
  touchableStyle?: TextStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}
const Button = (props: button) => {
  return (
    <>
      {typeof props.onClick === "function" && typeof props.text === "string" && (
        <View style={{}}>
          <TouchableOpacity
            onPress={() => props?.onClick()}
            style={[styles.addItemStyle, props.touchableStyle]}
          >
            {props?.loading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Text style={[styles.textStyle, props.textStyle]}>
                {props?.text}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  addItemStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "black",
    bottom: "30%",
  },
  textStyle: { color: "white" },
});
