import React from "react";
import { titles } from "../../mokedData/data";
import { setField } from "../../actions/setActions";
import { DataType } from "../../mokedData/types";
import { Icon, InputNumber } from "antd";
export const columns = (dispatch: Function, rows: Array<DataType>) =>
  Object.keys(titles).map((k, i) => {
    return {
      //@ts-ignore
      title: titles[k],
      dataIndex: k,
      key: k,
      render: (value: boolean | number, record: DataType) => {
        if (typeof value === "boolean") {
          const data = {
            field: k,
            index: record.key - 1,
            value: !value,
            rows
          };
          return (
            <Icon
              type={value ? "check" : "close"}
              style={{ color: value ? "green" : "red" }}
              onClick={() => {
                dispatch(setField(data));
              }}
            />
          );
        } else if (typeof value === "string") {
          return <div>{value}</div>;
        }
        return (
          <InputNumber
            value={value}
            min={0}
            onChange={val => {
              const data = {
                field: k,
                index: record.key - 1,
                value: val,
                rows
              };
              dispatch(setField(data));
            }}
          />
        );
      }
    };
  });
