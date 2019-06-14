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

export const setField = (data: DataInput) => ({
  type: "UPDATE_FIELD",
  rows: R.set(R.lensPath([data.index, data.field]), data.value, data.rows)
});

export const setSelectedRows = (data: SelectedRowDataInput) => ({
  type: "SET_SELECTED_ROWS",
  rows: data.rows.filter(row => data.keys.join(" ").includes(`${row.key}`))
});
