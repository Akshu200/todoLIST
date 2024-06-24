import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../utils/Constants";
import { showToast } from "../utils/utils";
import { updateItemArray } from "../redux/Slice";
import { createTodoTask, fetchAllTodoList } from "../firebase/curdAction";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/atoms/Button";
import CheckBoxText from "../components/atoms/CheckBoxText";

const AddTodoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state) => state?.todos?.items);
  const [loading, setloading] = useState(false)
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleCheckBoxValue = () => {
    showToast(!completed ? constants.taskAsdone : constants.taskasNotdone);
    setCompleted(!completed);
  };

  const addData = async () => {
    try {
      if (title !== "" && title.length > 0) {
        setloading(true)
        await createTodoTask({ title, completed, id: items.length + 1 });
        const result = await fetchAllTodoList();
        dispatch(updateItemArray(result));
        setloading(false)
        navigation.goBack();
      } else {
        showToast(constants.inputTextemptyerror);
      }
    } catch (error) {
      console.log("error in AddTodoScreen addData function");
    }
  };

  return (
    <View style={styles.main}>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        style={styles.inputTextStyle}
        value={title}
        placeholder={constants.typeSomething}
        placeholderTextColor={'black'}
      />
      <CheckBoxText
        title={"Completed"}
        onClick={() => handleCheckBoxValue()}
        checked={completed}
        textStyle={styles.checkboxTextStyle}
        touchableStyle={styles.chechkBoxView}
      />
      <Button
        text={"Add to list"}
        touchableStyle={styles.updateButton}
        textStyle={styles.textStyle}
        onClick={() => addData()}
        loading={loading}
      />
    </View>
  );
};

export default memo(AddTodoScreen);

const styles = StyleSheet.create({
  main: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputTextStyle: { borderWidth: 1, width: "80%", borderRadius: 10 ,color:"black"},
  chechkBoxView: { flexDirection: "row", alignItems: "center", width:'50%',borderWidth: 0 },
  checkboxTextStyle: { fontSize: 20, fontWeight: "bold" ,color:'black' },
  updateButton: {
    height: 40,
    width: 100,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  textStyle: { color: "white" },
});
