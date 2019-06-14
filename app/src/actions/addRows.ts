import { DataType } from "../mokedData/types";

export const addRows = (rows: Array<DataType>, take: number, skip: number) => ({
  type: "ADD_ROWS",
  rows: rows.slice(skip, take + skip)
});
