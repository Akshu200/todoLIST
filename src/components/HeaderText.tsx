import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { appliedFilterText } from "../utils/utils";

const HeaderText = () => {

  const todo = useSelector((state) => state?.todos);

  const textRef = useRef(null);
  
  useEffect(() => {
    if (textRef.current) {
      textRef.current.animate("fadeInUp", 500);
    }
  }, [todo?.items?.length]);
  return (
    <>
      {typeof todo?.items?.length !== "undefined" &&
        Array.isArray(todo?.items) && (
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{`${appliedFilterText(
              todo?.appliedFilter
            )}`}</Text>
            <Animatable.Text ref={textRef} style={styles.textStyle}>{`${
              todo?.items?.length > 0 ? todo?.items?.length : "0"
            }`}</Animatable.Text>
          </View>
        )}
    </>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  textStyle: { fontSize: 20 ,color:"black"},
  viewStyle: { flexDirection: "row", alignItems: "center" },
});
