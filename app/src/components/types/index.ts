import { DataType } from "../../mokedData/types";
import { AppState } from "../../reducers/datagrid";
export interface IDataGridProps {
  storeState: AppState;
  dispatch: Function;
}

export interface IDataGridState {
  unsavedData: Array<DataType>;
  selectedRowKeys: Array<string | number>;
  skip: number;
}
