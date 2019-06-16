import React from "react";
import { Row, Col, Card } from "antd";
import { Chart, Axis, Tooltip, Geom, Coord, Label } from "bizcharts";
import { connect } from "react-redux";
import { AppState } from "../../reducers/datagrid";

interface IMyChartProps {
  storeState: AppState;
}
const MyChart: React.FunctionComponent<IMyChartProps> = ({ storeState }) => {
  const data = storeState.selectedRows.map(row => {
    return {
      category: row.title,
      cost: row.cost,
      taxes: row.taxes
    };
  });
  const pieData = storeState.selectedRows.map(row => {
    return {
      category: row.title,
      average: row.average,
      cost: row.cost
    };
  });

  return (
    <Row type="flex" justify="center">
      <Col xl={18} md={18} sm={20}>
        <Card
          style={{ width: "100%", marginTop: 16 }}
          title="Select a row to display data"
        >
          {storeState.selectedRows.length > 0 ? (
            <Row type="flex" justify="center" align="middle">
              <Col xl={10} md={24} style={{ height: 270 }}>
                <span style={{ fontSize: 28, paddingLeft: 70 }}>
                  Item average
                </span>
                <Chart height={300} data={pieData} forceFit>
                  <Coord type="theta" radius={1} />
                  <Axis name="category" />

                  <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                  />
                  <Geom
                    type="intervalStack"
                    position="average"
                    color="category"
                    tooltip={[
                      "average",
                      item => {
                        return {
                          name: "average",
                          value: item
                        };
                      }
                    ]}
                    style={{
                      lineWidth: 1,
                      stroke: "#fff"
                    }}
                  >
                    <Label
                      content="average"
                      formatter={(val, item) => {
                        return item.point.category + ": " + val;
                      }}
                    />
                  </Geom>
                </Chart>
              </Col>
              <Col xl={10} md={24} style={{ height: 270 }}>
                <Row type="flex" justify="center">
                  <span style={{ fontSize: 28, paddingLeft: 70 }}>
                    Cost and taxes
                  </span>
                  <Chart height={300} style={{ width: "100%" }} data={data}>
                    <Axis name="sold" />
                    <Axis name="category" />
                    <Tooltip title="item*title" />
                    <Geom
                      type="interval"
                      position="category*cost"
                      color="cost"
                      size={24}
                    />
                    <Geom
                      type="interval"
                      position="category*taxes"
                      color="black"
                      size={2}
                    />
                  </Chart>
                </Row>
              </Col>
            </Row>
          ) : (
            <div>DISPLAY CONTAINER</div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (datagridReducer: any) => {
  return {
    storeState: datagridReducer
  };
};

export default connect(mapStateToProps)(MyChart);
