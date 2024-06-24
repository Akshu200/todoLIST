import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { CheckBox } from "react-native-elements";
import { timeConvert } from "../utils/momentTimeConverter";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  removeSelectedItem,
  updateItem,
  updateItemArray,
  updateSelectedItem,
  updateShowModel,
} from "../redux/Slice";
import { showTOAST, showToast } from "../utils/utils";
import {
  deteleTesk,
  fetchAllTodoList,
  updateTodo,
} from "../firebase/curdAction";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import Button from "./atoms/Button";
import { todoListItem } from "../utils/interfaces";

const ListRenderItem = ({ index, item }: { index: number; item: todoListItem }) => {
  const dispatch = useDispatch();
  const [updateLoading, setupdateLoading] = useState(false)
  const [deleteLaoding, setdeleteLaoding] = useState(false)
  const showModel = useSelector((state: any) => state?.todos?.showModel);
  const selectedItem = useSelector((state: any) => state?.todos?.selectedItem);
  const viewRef = useRef(null);
  const textRef = useRef(null);

  const handleUpdate = useCallback(
    (item: todoListItem) => {
      const value = {
        userId: item.userId,
        id: item.id,
        title: item.title,
        completed: item.completed,
        doc_id: item.doc_id,
      };
      dispatch(updateSelectedItem(value));
      dispatch(updateShowModel(!showModel));
    },
    [selectedItem, showModel]
  );

  const handleCheckbokClick = useCallback(
    async (value: todoListItem, index: number) => {
      const updatedItem = {
        userId: value?.userId,
        id: value?.id,
        title: value?.title,
        completed: value?.completed,
      };
      if (value.completed) {
        const item = {
          ...updatedItem,
          completed: false,
          updated_at: moment().toISOString(),
        };
        setupdateLoading(true)
        await updateTodo(value?.doc_id, item?.completed);
        dispatch(updateSelectedItem(item));
        dispatch(updateItem(item));
        setupdateLoading(false)
      } else {
        const item = {
          ...updatedItem,
          completed: true,
          updated_at: moment().toISOString(),
        };
        setupdateLoading(true)
        await updateTodo(value?.doc_id, item?.completed);
        dispatch(updateSelectedItem(item));
        dispatch(updateItem(item));
        setupdateLoading(false)
      }
      dispatch(updateSelectedItem(updatedItem));
      showTOAST(
        `Task id: ${value?.id} ${
          !value.completed ? "Mark as Done" : "Mark as Not Done!"
        }`,
        false
      );
      dispatch(removeSelectedItem());
    },
    [selectedItem, item]
  );

  const handleDelete = async (item: todoListItem) => {
    setdeleteLaoding(true)
    await deteleTesk(item?.doc_id);
    dispatch(deleteTask(item?.doc_id));
    showToast(`This ID: ${item?.id} is Deleted Successfully`);
    const result = await fetchAllTodoList();
    dispatch(updateItemArray(result));
    setdeleteLaoding(false)
  };
  return (
    <Animatable.View
      ref={viewRef}
      animation="fadeInUp"
      duration={200}
      delay={index}
      key={index}
      style={styles.animateViewStyle}
    >
      <View style={styles.titleViewStyle}>
        <Text
          style={{ width: "70%", fontSize: 18,color:'black' }}
          numberOfLines={2}
        >{` Title: ${item?.title}`}</Text>
        <CheckBox
          checked={item?.completed}
          onPress={() => handleCheckbokClick(item, index)}
        />
      </View>

      <View style={styles.buttonContainerView}>
        <Button
          onClick={() => handleUpdate(item)}
          touchableStyle={styles.updateButton}
          text="Update"
          textStyle={styles.textStyle}
          loading={updateLoading}
        />
        <Button
          onClick={() => handleDelete(item)}
          touchableStyle={styles.updateButton}
          text="Delete"
          textStyle={styles.textStyle}
          loading={deleteLaoding}
        />
      </View>
      <View style={{ flexDirection: "column", marginVertical: 10, }}>
        <Text style={{color:'black' }}>{`Created At: ${timeConvert(item?.created_at)}`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{color:'black' }}>Updated At:</Text>
          <Animatable.Text ref={textRef} style={{color:'black' }}>{`${timeConvert(
            item?.updated_at
          )}`}</Animatable.Text>
        </View>
      </View>
    </Animatable.View>
  );
};

export default ListRenderItem;

const styles = StyleSheet.create({
  buttonContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle:{ color: "white" },
  animateViewStyle: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 12,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todoItem: {},
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
  itemSeperatorCompStyle: { marginVertical: 10 },
  titleViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
});
