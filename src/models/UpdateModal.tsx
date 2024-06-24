import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeSelectedItem,
  updateItem,
  updateSelectedCompleted,
  updateSelectedTitle,
  updateShowModel,
} from "../redux/Slice";
import { TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { updateTodo } from "../redux/AsyncAction";
import { showToast } from "../utils/utils";
import { constants } from "../utils/Constants";
import { updateSelectedItem } from "../firebase/curdAction";
import moment from "moment";
import Button from "../components/atoms/Button";

const UpdateModal = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state?.todos?.selectedItem);
  const showModel = useSelector((state) => state?.todos?.showModel);
  const [loading, setloading] = useState(false)
  const handleUpdate = async() => {
    const item = {
      id: value.id,
      completed: value?.completed,
      title: value?.title,
      updated_at:moment().toISOString()
    };
    setloading(true)
    await updateSelectedItem(value.doc_id,item)
    dispatch(updateItem(item));
    dispatch(updateShowModel(!showModel));
    setloading(false)
    showToast(`Todo list ${value?.id} is Updated.`)
    dispatch(removeSelectedItem());
  };

  const handleCheckBox = () => {
    dispatch(updateSelectedCompleted(!value?.completed));
    showToast(!value.completed ? constants.teskDone :constants.teskNOtDone)
  };
  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModel}
        onRequestClose={() => {
          dispatch(updateShowModel(!showModel));
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Modal</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Title"
              onChangeText={(text) => dispatch(updateSelectedTitle(text))}
              value={value?.title}
            />

            <View style={styles.textViewCheckbox}>
              <Text style={styles.textStyle}>Completed</Text>
              <CheckBox
                checked={value?.completed}
                onPress={() => handleCheckBox()}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleUpdate()}
              style={styles.toucbhaleBtn}
            >
              {!loading?<Text style={{ color: "white" }}>Update</Text>:<ActivityIndicator/>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(UpdateModal);

const styles = StyleSheet.create({
  main: { backgroundColor: "red", flex: 1, height: "100%", width: "100%" },
  textInput: { width: "100%", borderWidth: 1, borderRadius: 10 },
  textViewCheckbox: { flexDirection: "row", alignItems: "center" },
  toucbhaleBtn: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
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
    alignItems: "center",
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
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
