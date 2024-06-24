import {
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { memo, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortValuebyAcending,
  setSortValuebyDescending,
  updateShowSortByModal,
  updateSorttbyAscend,
  updateSorttbyDescend,
  updateSorttbyRecent,
  setSortValuebyRecent,
} from "../redux/Slice";
import CheckBoxText from "../components/atoms/CheckBoxText";

const SortByModal = () => {
  const dispatch = useDispatch();

  const showSortByModal = useSelector((state) => state?.todos?.showSortByModal);
  const sortByValue = useSelector((state) => state?.todos?.sortBy);
  const items = useSelector((state: any) => state?.todos?.items);

  const handleRecent = useCallback(() => {
    dispatch(setSortValuebyRecent(items));
    dispatch(updateSorttbyRecent(!sortByValue?.recent));
    dispatch(updateShowSortByModal(!showSortByModal));
  },[items,showSortByModal,sortByValue])

  const handleAcending = useCallback(() => {
    dispatch(setSortValuebyAcending());
    dispatch(updateSorttbyAscend(!sortByValue?.ascendingOrder));
    dispatch(updateShowSortByModal(!showSortByModal));
  },[items,showSortByModal,sortByValue])

  const handleDescending = useCallback(() => {
    dispatch(setSortValuebyDescending());
    dispatch(updateSorttbyDescend(!sortByValue?.descendingOrder));
    dispatch(updateShowSortByModal(!showSortByModal));
  },[items,showSortByModal,sortByValue])
  
  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSortByModal}
        onRequestClose={() => {
          dispatch(updateShowSortByModal(!showSortByModal));
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              Sort by Modal
            </Text>

            <CheckBoxText
              title={"Sort by Recent"}
              onClick={() => handleRecent()}
              checked={sortByValue?.recent}
            />
            <CheckBoxText
              title={"Sort by Ascending order"}
              onClick={() => handleAcending()}
              checked={sortByValue?.ascendingOrder}
            />
            <CheckBoxText
              title={"Sort by Descending order"}
              onClick={() => handleDescending()}
              checked={sortByValue?.descendingOrder}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(SortByModal);

const styles = StyleSheet.create({
  main: { backgroundColor: "red", flex: 1, height: "100%", width: "100%" },

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
    height: "45%",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
