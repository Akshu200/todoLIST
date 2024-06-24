import { StyleSheet, Text, View ,ActivityIndicator} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderText from "../components/HeaderText";
import FilterSortBY from "../components/FilterSortBY";
import { FlashList } from "@shopify/flash-list";
import ListRenderItem from "../components/ListRenderItem";
import { updateItemArray } from "../redux/Slice";
import { createTodoTask, fetchAllTodoList } from "../firebase/curdAction";
import { useNavigation } from "@react-navigation/native";
import { constants } from "../utils/Constants";
import Button from "../components/atoms/Button";
import ModalView from "../models/ModalView";

const MainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state: any) => state?.todos?.items);
  const [loading, setloading] = useState(false)
  const getData = async () => {
    setloading(true)
    const result = await fetchAllTodoList();
    dispatch(updateItemArray(result));
    setloading(false);
  };
  useEffect(() => {
    navigation.setOptions({ headerRight: () => <HeaderText /> });
    getData();
  }, []);

  if(loading){
    return <ActivityIndicator></ActivityIndicator>
  }
  return (
    <View style={styles.container}>
      <FilterSortBY />
      <FlashList
        estimatedItemSize={200}
        data={items}
        keyExtractor={(item: any) => item.doc_id.toString()}
        renderItem={({ item, index }) => (
          <ListRenderItem index={index} item={item} />
        )}
      />
      <Button
        text="Add items"
        onClick={() => navigation.navigate(constants.addtoScreen)}
      />
      <ModalView />
    </View>
  );
};

export default memo(MainScreen);

const styles = StyleSheet.create({
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
});
