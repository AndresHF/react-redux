import React from "react";
import { Table, Divider, Row, Col, Button, message } from "antd";
import { data } from "../../mokedData/data";
import { addRows } from "../../actions/addRows";
import "antd/dist/antd.css";
import { ReactReduxContext, connect } from "react-redux";
import { IDataGridProps, IDataGridState } from "../types";
import { columns } from "./columns";
import { setSelectedRows } from "../../actions/setActions";
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
    const canSave = R.difference(storeState.rows, unsavedData).length > 0;
    console.log("<<<<<<<", this.state.unsavedData);
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <React.Fragment>
            <Divider />
            <Row type="flex" justify="center">
              <Col xl={18} md={18} sm={20}>
                <Table
                  columns={columns(dispatch, store.getState().rows)}
                  dataSource={store.getState().rows}
                  footer={undefined}
                  pagination={false}
                  //@ts-ignore
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: selectedRowKeys => {
                      dispatch(
                        setSelectedRows({
                          keys: selectedRowKeys,
                          rows: store.getState().rows
                        })
                      );
                      this.setState({
                        selectedRowKeys
                      });
                    }
                  }}
                />
                <Row
                  style={{ paddingTop: 20 }}
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
                        message.success(
                          "I should be launching a server mutation..."
                        );
                        message.success("Data saved!");
                        this.setState({
                          unsavedData: store.getState().rows
                        });
                        dispatch(
                          setSelectedRows({
                            keys: selectedRowKeys,
                            rows: store.getState().rows
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
                      disabled={data.length <= store.getState().rows.length}
                      onClick={() => {
                        dispatch(addRows(data, itemsPerLoad, skip));
                        this.setState({
                          unsavedData: store.getState().rows
                        });
                      }}
                    >
                      Load more
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Divider />
          </React.Fragment>
        )}
      </ReactReduxContext.Consumer>
    );
  }
}
const mapStateToProps = (datagridReducer: any) => {
  return {
    storeState: datagridReducer
  };
};
export default connect(mapStateToProps)(DataGrid);
