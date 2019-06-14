//@ts-ignore
import { DataType } from "../mokedData/types";
type ActionType = {
  type: string;
  rows: Array<DataType>;
};

export type AppState = {
  selectedRows: Array<DataType>;
  rows: Array<DataType>;
};

export const datagridReducer = (
  state: AppState = { selectedRows: [], rows: [] },
  action: ActionType
): AppState => {
  switch (action.type) {
    case "ADD_ROWS":
      return {
        selectedRows: state.selectedRows,
        rows: [...state.rows, ...action.rows]
      };
    case "UPDATE_FIELD":
      return {
        selectedRows: state.selectedRows,
        rows: action.rows
      };
    case "SET_SELECTED_ROWS":
      return {
        selectedRows: action.rows,
        rows: state.rows
      };
    default:
      return state;
  }
};
