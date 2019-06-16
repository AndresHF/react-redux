import React from "react";
import "./styles/App.css";
import DataGrid from "./components/dataGrid/DataGrid";
import MyChart from "./components/rowAverage/RowAverage";
import { Row } from "antd";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Row style={{ width: "100%" }}>
          <MyChart />
        </Row>
        <Row style={{ width: "100%" }}>
          <DataGrid />
        </Row>
      </div>
    );
  }
}

export default App;
