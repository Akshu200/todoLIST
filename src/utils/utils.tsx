import { ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import { AppliedFilter } from "./interfaces";

export const showToast = (value: string) => {
  if (typeof value === "string" && typeof value !== "undefined") {
    ToastAndroid.show(`${value}`, ToastAndroid.TOP);
  } else {
    console.log("oops!, add text to show toast!!");
  }
};

export const showToastWithGravityAndOffset = (value: string) => {
  if (typeof value === "string" && typeof value !== "undefined") {
    ToastAndroid.showWithGravityAndOffset(
      value,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    console.log("oops!, add text to showToastWithGravityAndOffset!!");
  }
};

export const showTOAST = (text: string, value = true, duration = 1500) => {
  if (typeof text === "string" && typeof value !== "undefined") {
    Toast.show({
      type: "success",
      text1: text,
    });
    setTimeout(() => {
      Toast.hide();
    }, duration);
  } else {
    console.log("the erro");
  }
};

export const updaterFilterArray = (value: any, array: any) => {
  if (
    Array.isArray(array) &&
    typeof array !== "undefined" &&
    typeof value !== "undefined" &&
    typeof value === "object"
  ) {
    let newArr = [];
    array?.forEach((item: any) => {
      if (item.id === value.id) {
        newArr.push(value);
      } else {
        newArr.push(item);
      }
    });

    return newArr;
  } else {
    console.log("else part of updaterFilterArray function");
  }
};

export const appliedFilterText = (value: AppliedFilter) => {
  if (value?.all === true) {
    return "Total Count: ";
  }

  if (value?.active === true) {
    return "Active: ";
  }

  if (value?.done === true) {
    return "Completed: ";
  }
};
