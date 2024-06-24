import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { asendingSort, descendingSort, recentSort } from "../utils/SortbyUtils";
import { updaterFilterArray } from "../utils/utils";
import { todoListItem, todosLIst } from './../utils/interfaces';

export const initialState:todosLIst={
 items:{},
  loading: false,
  selectedItem: {
    userId: 0,
    id: 0,
    title: "",
    completed: false,
    doc_id:"",
  },
  showModel: false,
  showSortByModal: false,
  showFilterModal: false,
  appliedFilter: {
    all: true,
    active: false,
    done: false,
  },
  activeArray: [],
  doneArray: [],
  original: [],
  updateMostRecentArray: [],
  sortBy: {
    recent: false,
    ascendingOrder: false,
    descendingOrder: false,
  },
}
const todoSlice = createSlice({
  name: "todos",
  initialState :initialState,
  reducers: {
      updateItemArray:(state,{payload})=>{
        state.items=payload
      },
      //delete
      deleteTask:(state,{payload})=>{
        state.items = state.items.filter((todo:todoListItem) => todo.id !== payload)
      },

      completedArray:(state,{payload})=>{
          const newArr=[]
          payload.filter((item:todoListItem,index:number)=>{
            if(item.completed === true){
              newArr.push(item)
            }
          })
          state.items=newArr
      },
      pendingArray:(state,{payload})=>{
        const newArr=[]
        payload.filter((item,index)=>{
          if(item.completed === false){
            newArr.push(item)
          }
        })
        state.items=newArr
      },
      allArray:(state,{payload})=>{
          state.items=payload
      },
    updateActiveArray:(state,{payload})=>{
      state.activeArray=updaterFilterArray(payload,state.activeArray)
    },
    updateDoneArray:(state,{payload})=>{
      state.doneArray= updaterFilterArray(payload,state.doneArray)
    },
    //modal
    updateShowModel: (state, { payload }) => {
      state.showModel = payload;
    },
    updateShowSortByModal: (state, { payload }) => {
      state.showSortByModal = payload;
    },
    updateShowFilterModal: (state, { payload }) => {
      state.showFilterModal = payload;
    },

    //selected item for update
    updateSelectedItem: (state, { payload }) => {
      state.selectedItem.completed = payload.completed;
      state.selectedItem.id = payload.id;
      state.selectedItem.title = payload.title;
      state.selectedItem.userId = payload.userId;
      state.selectedItem.doc_id = payload.doc_id;
    },

    //remove selected item.
    removeSelectedItem: (state, { payload }) => {
      state.selectedItem.completed = false;
      state.selectedItem.id = 0;
      state.selectedItem.title = "";
      state.selectedItem.userId = 0;
    },

    updateSelectedTitle: (state, { payload }) => {
      state.selectedItem.title = payload;
    },
    updateSelectedCompleted: (state, { payload }) => {
      state.selectedItem.completed = payload;
    },

    //sortby function
    updateSorttbyRecent: (state, { payload }) => {
      state.sortBy.recent = true;
      state.sortBy.ascendingOrder = false;
      state.sortBy.descendingOrder = false;
    },
    updateSorttbyAscend: (state, { payload }) => {
      state.sortBy.ascendingOrder = true;
      state.sortBy.recent = false;
      state.sortBy.descendingOrder = false;
    },
    updateSorttbyDescend: (state, { payload }) => {
      state.sortBy.descendingOrder = true;
      state.sortBy.recent = false;
      state.sortBy.ascendingOrder = false;
    },

    //set Sort by
    setSortValuebyRecent: (state, { payload }) => {
      // console.log('the RECENT ',payload)
      state.items = recentSort(state.items);
    },
    setSortValuebyAcending: (state, { payload }) => {
      state.items = asendingSort(state.items);
    },
    setSortValuebyDescending: (state, { payload }) => {
      state.items = descendingSort(state.items);
    },

    //filter function
    updateFilterActive: (state, { payload }) => {
      state.appliedFilter.active = true;
      state.appliedFilter.done = false;
      state.appliedFilter.all = false;
    },
    updateFilterDone: (state, { payload }) => {
      state.appliedFilter.done = true;
      state.appliedFilter.active = false;
      state.appliedFilter.all = false;
    },
    updateFilterAll: (state, { payload }) => {
      state.appliedFilter.all = true;
      state.appliedFilter.done = false;
      state.appliedFilter.active = false;
    },

    mostrecentArray: (state, { payload }) => {
    state.updateMostRecentArray=state.items
    },
    //done item filter  ; completed value is true
    setDonefilter: (state, { payload }) => {
      state.items=state.doneArray
    },
    //active function
    setActivefilter: (state, { payload }) => {
      state.items=state.activeArray
    },
    // //all function
    setAppliedFilter: (state, { payload }) => {
      state.items = state.items;
    },


    //curd through redux
    //add
    addItem:(state,{payload})=>{
      const modifyItem={
        ...payload,
        created_at: moment().toISOString(),
        updated_at: '',
      }
      state.items.push(modifyItem)
    },
    //delete

    //update
    updateItem:(state,{payload})=>{
      const updatedTodo = payload;
      const existingTodo = state.items.find(
        (todo) => todo?.id === updatedTodo?.id
      );
      if (existingTodo) {
        existingTodo.title = updatedTodo?.title;
        existingTodo.completed = updatedTodo?.completed;
        existingTodo.updated_at = moment().toISOString();
      }
    },

  },
  extraReducers: (builder) => {},
});
export const {
  updateSelectedItem,
  removeSelectedItem,
  updateShowModel,
  updateSelectedTitle,
  updateSelectedCompleted,
  updateShowSortByModal,
  updateShowFilterModal,
  updateFilterActive,
  updateFilterDone,
  updateFilterAll,
  setDonefilter,
  setActivefilter,
  setAppliedFilter,
  updateSorttbyRecent,
  updateSorttbyAscend,
  updateSorttbyDescend,
  setSortValuebyDescending,
  setSortValuebyAcending,
  setSortValuebyRecent,
  mostrecentArray,
  updateActiveArray,
  updateDoneArray,


  //firebase
  updateItemArray,
  deleteTask,
  completedArray,
  pendingArray,

  //curd redux
  addItem,
  updateItem,
} = todoSlice.actions;
export default todoSlice.reducer;
