import React from "react";
import { Table, Row, Col, Button, message } from "antd";
import { data } from "../../mokedData/data";
import { addRows } from "../../actions/addRows";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { IDataGridProps, IDataGridState } from "../types";
import { columns } from "./columns";
import { setSelectedRows } from "../../actions/setActions";
import Filters from "./Filters";
import * as R from "ramda";

const itemsPerLoad = 4;

class DataGrid extends React.Component<IDataGridProps, IDataGridState> {
  constructor(props: any) {
    super(props);
    this.state = {
      unsavedData: [],
      selectedRowKeys: [],
      skip: 0
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { skip } = this.state;
    dispatch(addRows(data, itemsPerLoad, skip));
    const unsavedData = data.slice(skip, itemsPerLoad);
    this.setState({
      unsavedData,
      selectedRowKeys: [],
      skip: itemsPerLoad
    });
  }

  render() {
    const { dispatch, storeState } = this.props;
    const { unsavedData, selectedRowKeys, skip } = this.state;
    let filteredRows = storeState.availabilityFilter
      ? storeState.rows.filter(row => row.availabilty)
      : storeState.rows;
    filteredRows = storeState.confirmedFilter
      ? filteredRows.filter(row => row.confirmed)
      : filteredRows;
    const canSave = R.difference(storeState.rows, unsavedData).length > 0;
    return (
      <Row type="flex" justify="center">
        <Filters />
        <Col xl={18} sm={20}>
          <Table
            style={{
              height: "40vh",
              overflowY: "scroll"
            }}
            className="scroll"
            columns={columns(dispatch, storeState.rows)}
            dataSource={filteredRows}
            footer={undefined}
            pagination={false}
            //@ts-ignore
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              onChange: selectedRowKeys => {
                dispatch(
                  setSelectedRows({
                    keys: selectedRowKeys,
                    rows: filteredRows
                  })
                );
                this.setState({
                  selectedRowKeys
                });
              }
            }}
          />
        </Col>
        <Row
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            width: "75%"
          }}
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col xl={19} sm={11}>
            <Button
              type="primary"
              shape="round"
              style={{ width: "100%" }}
              disabled={!canSave}
              onClick={() => {
                message.success("I should be launching a server mutation...");
                message.success("Data saved!");
                this.setState({
                  unsavedData: storeState.rows
                });
                dispatch(
                  setSelectedRows({
                    keys: selectedRowKeys,
                    rows: storeState.rows
                  })
                );
              }}
            >
              Confirm
            </Button>
          </Col>
          <Col xl={4} sm={11}>
            <Button
              type="primary"
              shape="round"
              style={{ width: "100%" }}
              disabled={data.length <= storeState.rows.length}
              onClick={async () => {
                await dispatch(addRows(data, itemsPerLoad, skip));
                this.setState({
                  unsavedData: this.props.storeState.rows,
                  skip: skip + itemsPerLoad
                });
              }}
            >
              Load more
            </Button>
          </Col>
        </Row>
      </Row>
    );
  }
}
const mapStateToProps = (datagridReducer: any) => {
  return {
    storeState: datagridReducer
  };
};
export default connect(mapStateToProps)(DataGrid);
