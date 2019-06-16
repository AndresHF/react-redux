import { DataType } from "../mokedData/types";
import * as R from "ramda";

type DataInput = {
  field: string;
  index: number;
  value: number | boolean | undefined;
  rows: Array<DataType>;
};

type SelectedRowDataInput = {
  keys: Array<number | string>;
  rows: Array<DataType>;
};

export const filterItems = (
  activated: boolean,
  type: "availability" | "confirmed"
) => {
  console.log(`SET_${type.toUpperCase()}_FILTER`);
  return {
    type: `SET_${type.toUpperCase()}_FILTER`,
    activated
  };
};
