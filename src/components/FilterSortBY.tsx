import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { updateShowFilterModal, updateShowSortByModal } from "../redux/Slice";
import { useDispatch, useSelector } from "react-redux";

const FilterSortBY = () => {
  const dispatch = useDispatch();
  const showFilterModal = useSelector((state) => state?.todos?.showFilterModal);
  const showSortByModal = useSelector((state) => state?.todos?.showSortByModal);
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity
        onPress={() => dispatch(updateShowSortByModal(!showSortByModal))}
        style={styles.updateButton}
      >
        <Text style={styles.textStyle}>Sort by</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(updateShowFilterModal(!showFilterModal))}
        style={styles.updateButton}
      >
        <Text style={styles.textStyle}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(FilterSortBY);

const styles = StyleSheet.create({
  updateButton: {
    height: 40,
    width: "40%",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "grey",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textStyle: { color: "white" },
});
