import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import FilterModal from "./FilterModal";
import SortByModal from "./SortByModal";
import UpdateModal from "./UpdateModal";
import { useSelector } from "react-redux";

const ModalView = () => {
  const modal = useSelector((state: any) => state?.todos);
  return (
    <View>
      {modal.showModel && <UpdateModal />}
      {modal.showFilterModal && <FilterModal />}
      {modal.showSortByModal && <SortByModal />}
    </View>
  );
};

export default memo(ModalView);

const styles = StyleSheet.create({});
