import React from "react";
import "./styles/App.css";
import DataGrid from "./components/dataGrid/DataGrid";
import MyChart from "./components/rowAverage/RowAverage";
import { datagridReducer } from "./reducers/datagrid";
console.log(typeof datagridReducer);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyChart />
        <DataGrid />
      </div>
    );
  }
}

export default App;
