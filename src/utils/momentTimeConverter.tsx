import moment from "moment";

export const timeConvert = (value: string) => {
  try {
    if(value ===''){
      return ''
    }
    if (typeof value !== "undefined" && typeof value === "string") {
      const formattedUpdatedAt = moment(value)
        .utcOffset("+05:30")
        .format("MMMM Do YYYY, h:mm:ss a");
      return formattedUpdatedAt;
    }
   
  } catch (error) {
    console.log("error in timeConvert function", error);
  }
};
