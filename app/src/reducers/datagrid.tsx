//@ts-ignore
import { DataType } from "../mokedData/types";
type ActionType = {
  type: string;
  rows?: Array<DataType>;
  activated?: boolean;
};

export type AppState = {
  selectedRows: Array<DataType>;
  rows: Array<DataType>;
  availabilityFilter: boolean;
  confirmedFilter: boolean;
};

export const datagridReducer = (
  state: AppState = {
    selectedRows: [],
    rows: [],
    availabilityFilter: false,
    confirmedFilter: false
  },
  action: ActionType
): AppState => {
  switch (action.type) {
    case "ADD_ROWS":
      return {
        selectedRows: state.selectedRows,
        rows: [...state.rows, ...action.rows!],
        availabilityFilter: state.availabilityFilter,
        confirmedFilter: state.confirmedFilter
      };
    case "UPDATE_FIELD":
      return {
        selectedRows: state.selectedRows,
        rows: action.rows!,
        availabilityFilter: state.availabilityFilter,
        confirmedFilter: state.confirmedFilter
      };
    case "SET_SELECTED_ROWS":
      return {
        selectedRows: action.rows!,
        rows: state.rows,
        availabilityFilter: state.availabilityFilter,
        confirmedFilter: state.confirmedFilter
      };
    case "SET_AVAILABILITY_FILTER":
      return {
        selectedRows: state.selectedRows,
        rows: state.rows,
        availabilityFilter: action.activated!,
        confirmedFilter: state.confirmedFilter
      };
    case "SET_CONFIRMED_FILTER":
      return {
        selectedRows: state.selectedRows,
        rows: state.rows,
        availabilityFilter: state.availabilityFilter,
        confirmedFilter: action.activated!
      };
    default:
      return state;
  }
};
