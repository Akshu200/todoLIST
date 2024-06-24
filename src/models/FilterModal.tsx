import { Modal, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allArray,
  completedArray,
  mostrecentArray,
  pendingArray,
  setActivefilter,
  setAppliedFilter,
  setDonefilter,
  updateFilterActive,
  updateFilterAll,
  updateFilterDone,
  updateItemArray,
  updateShowFilterModal,
} from "../redux/Slice";
import CheckBoxText from "../components/atoms/CheckBoxText";
import { fetchAllTodoList, fetchFilterdData } from "../firebase/curdAction";

const FilterModal = () => {
  
  const dispatch = useDispatch();
  const showFilterModal = useSelector(
    (state: any) => state?.todos?.showFilterModal
  );
  const appliedFilter = useSelector(
    (state: any) => state?.todos?.appliedFilter
  );
  const items = useSelector((state: any) => state?.todos?.items);

  const handleAll = useCallback(async () => {
    const resp = await fetchAllTodoList();
    dispatch(updateItemArray(resp));
    dispatch(updateFilterAll());
    dispatch(updateShowFilterModal(!showFilterModal));
  }, [appliedFilter?.all, showFilterModal, items]);

  const handleActive = useCallback(async () => {
    const resp = await fetchFilterdData(false);
    dispatch(updateItemArray(resp));
    dispatch(updateFilterActive());
    dispatch(updateShowFilterModal(!showFilterModal));
  }, [appliedFilter?.active, showFilterModal, items]);

  const handleDone = useCallback(async () => {
    const resp = await fetchFilterdData(true);
    dispatch(updateItemArray(resp));
    dispatch(updateFilterDone());
    dispatch(updateShowFilterModal(!showFilterModal));
  }, [appliedFilter?.done, showFilterModal, items]);

  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Filter Modal</Text>

            <CheckBoxText
              title={"All"}
              checked={appliedFilter?.all}
              onClick={() => handleAll()}
            />
            <CheckBoxText
              title={"Active"}
              checked={appliedFilter?.active}
              onClick={() => handleActive()}
            />
            <CheckBoxText
              title={"Done"}
              checked={appliedFilter?.done}
              onClick={() => handleDone()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(FilterModal);

const styles = StyleSheet.create({
  main: { backgroundColor: "red", flex: 1, height: "100%", width: "100%" },
  textStyle: { fontSize: 20, fontWeight: "700" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "35%",
    width: "80%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
