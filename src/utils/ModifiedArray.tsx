import { useSelector } from "react-redux";

const filter = useSelector((state) => state?.todos?.appliedFilter);
export const modifiedArray = (array: any) => {
  if (filter?.done) {
    const newArr = [];
    array.filter((item) => {
      if (item?.completed === true) {
        newArr.push(item);
      }
    });
    return newArr;
  }
  if (filter?.active) {
    const activeArr = [];
    array.filter((item) => {
      if (item?.completed === false) {
        activeArr.push(item);
      }
    });
    return activeArr;
  }
  // if(filter?.all){

  // }
};
