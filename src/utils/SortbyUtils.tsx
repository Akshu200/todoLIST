import moment from "moment";
import { todoListItem } from "./interfaces";

export const recentSort = (item: todoListItem) => {
  try {
    if (typeof item !== "undefined" && Array.isArray(item) && item.length > 0) {
      const result = item?.sort((a, b) => {
        if (a.updated_at !== "" && b.updated_at !== "") {
          return moment(b.updated_at).diff(moment(a.updated_at));
        } else {
          return moment(b.created_at).diff(moment(a.created_at));
        }
      });
      return result;
    }
  } catch (error) {
    console.log("the errorin  recentSort function ", error);
  }
};
export const asendingSort = (array: todoListItem) => {
  if (
    Array.isArray(array) &&
    typeof array !== "undefined" &&
    array.length > 0
  ) {
    return array.sort((a, b) => a.id - b.id);
  }
};
export const descendingSort = (array: todoListItem) => {
  if (
    Array.isArray(array) &&
    typeof array !== "undefined" &&
    array.length > 0
  ) {
    return array.sort((a, b) => b.id - a.id);
  }
};
