import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

//gettAll
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.map((todo: any) => ({
      ...todo,
      created_at: moment().toISOString(),
      updated_at: '',
    }));
  } catch (error) {
    console.log("error while fetching fetchTodos");
  }
});

//delete
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    console.log("error while fetching deleteTodo");
  }
});

//add
export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  try {
    const response = await axios.post(apiUrl, newTodo);
    return {
      ...response.data,
      created_at: moment().toISOString(),
      updated_at: moment().toISOString(),
    };
  } catch (error) {
    console.log("error while fetching addTodo");
  }
});

//update
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    try {
      const { id, ...rest } = updatedTodo;
      const response = await axios.put(`${apiUrl}/${id}`, rest);
      return response.data;
    } catch (error) {
      console.log("error while fetching updateTodo");
    }
  }
);
