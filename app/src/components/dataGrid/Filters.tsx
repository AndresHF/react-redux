import React from "react";
import { Switch, Col, Collapse } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { filterItems } from "../../actions/filterActions";

const Filters: React.FunctionComponent<any> = ({ dispatch, storeState }) => {
  return (
    <Col xl={18} sm={20}>
      <Collapse style={{ textAlign: "left" }}>
        <Collapse.Panel header="Filters" key="1">
          <span>Only available items &nbsp;</span>
          <Switch
            onClick={() => {
              dispatch(
                filterItems(!storeState.availabilityFilter, "availability")
              );
            }}
          />
          <span style={{ marginLeft: 30 }}>Only confirmed items &nbsp;</span>
          <Switch
            onClick={() => {
              dispatch(filterItems(!storeState.confirmedFilter, "confirmed"));
            }}
          />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
};
const mapStateToProps = (datagridReducer: any) => {
  return {
    storeState: datagridReducer
  };
};
export default connect(mapStateToProps)(Filters);
