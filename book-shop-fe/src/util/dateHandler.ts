import moment from "moment/moment";

export const formatDate = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
}