import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "../../firebaseConfig";
import moment from "moment";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { todoListItem } from "../utils/interfaces";
const db = getFirestore(app);

const todolist = collection(db, "todosList");

export const createTodoTask = async (data: any) => {
  try {
    const addData = {
      created_at: moment().toISOString(),
      updated_at: "",
      ...data,
    };

    return await addDoc(todolist, addData);
  } catch (error) {
    console.error("Error createTodoTask : ", error);
  }
};
export const updateTodo = async (docId: string, item: todoListItem) => {
  try {
    const updateData = doc(todolist, docId);

    return await updateDoc(updateData, {
      completed: item,
      updated_at: moment().toISOString(),
    });
  } catch (error) {
    console.error("Error updateTodo : ", error);
  }
};

export const updateSelectedItem = async (docId: string, item: todoListItem) => {
  try {
    const updateData = doc(todolist, docId);
    return await updateDoc(updateData, {
      completed: item.completed,
      updated_at: moment().toISOString(),
      title: item.title,
    });
  } catch (error) {
    console.error("Error updateTodo : ", error);
  }
};

export const deteleTesk = async (id: string) => {
  try {
    const docref = doc(todolist, id);
    return await deleteDoc(docref);
  } catch (error) {
    console.error("Error deteleTesk todos: ", error);
    return [];
  }
};

export const fetchFilterdData = async (valData: boolean) => {
  try {
    const todosCollection = await firestore().collection("todosList").get();
    const newArr = todosCollection.docs.map((doc, index) => ({
      ...doc.data(),
      doc_id: doc.id,
      id: index+1,
    }));
    const completed: todoListItem[] = [];
    newArr.map((value, index: number) => {
      if (value.completed === valData) {
        //if valData is true fetch all true vale else false value
        console.log("the valuue", value);
        completed.push(value);
      }
    });
    return completed;
  } catch (error) {
    console.error("Error fetchFilterdData todos: ", error);
  }
};
export const fetchAllTodoList = async () => {
  try {
    const todosCollection = await firestore().collection("todosList").get();
    return todosCollection.docs.map((doc, index) => ({
      ...doc.data(),
      doc_id: doc.id,
      id: index+1,
    }));
  } catch (error) {
    console.error("Error fetchAllTodoList todos: ", error);
  }
};
