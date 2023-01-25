import React from "react";
import { loginData, orderData, transactionData } from "../TableData";
import Button from "../../button/Button";
import { Input } from "reactstrap";

export const DependentTable = ({ action, isCompact, data }) => {

  return (
    <table className={`table table-tranx ${isCompact ? "is-compact" : ""}`}>
      <thead>
        <tr className="tb-tnx-head">
          <th className="tb-tnx-id">

          </th>
          <th className="tb-tnx-id">
            <span className="">SURNAME</span>
          </th>
          <th className="tb-tnx-id">
            <span className="">FIRST NAME</span>
          </th>
          <th className="tb-tnx-id">
            <span className="">AGE</span>
          </th>
          <th className="tb-tnx-id">
            <span className="">ID NUMBER</span>
          </th>
          <th className="tb-tnx-id">
            <span className="">RELATIONSHIP</span>
          </th>
          <th className="tb-tnx-id">

          </th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((item) => {
              return (
                <tr key={item.id} className="tb-tnx-item">
                  
                  <td className="tb-tnx-id">
                    <a
                      href="#id"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      <span>{item.id}</span>
                    </a>
                  </td>
                  <td className="tb-tnx-info">  
                    <div className="tb-tnx-desc">
                      <span className="title">{item.bill}</span>
                    </div>
                  </td>
                </tr>
              );
            })
          : transactionData.data.map((item) => {
              return (
                <tr key={item.id} className="tb-tnx-item">
                  <td className="tb-tnx-id checkbox-filed">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="default-5" ></Input>
                    </div>
                  </td>
                  <td className="tb-tnx-id">
                    <a
                      href="#id"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      <span>{item.id}</span>
                    </a>
                  </td>
                  <td className="tb-tnx-info">
                    <div className="tb-tnx-desc">
                      <span className="title">{item.bill}</span>
                    </div>
                  </td>
                  <td className="tb-tnx-info">
                    <div className="tb-tnx-desc">
                      <span className="title">{item.bill}</span>
                    </div>
                  </td>
                  <td className="tb-tnx-info">
                    <div className="tb-tnx-desc">
                      <span className="title">{item.bill}</span>
                    </div>
                  </td>
                  <td className="tb-tnx-info">
                    <div className="tb-tnx-desc">
                      <span className="title">{item.bill}</span>
                    </div>
                  </td>
                  <td className="tb-tnx-info">
                    <div className="btn-group">
                      <Button color="" className="btn-icon">
                          <span>Edit</span>
                      </Button>
                      <Button color="" className="btn-icon">
                          <span>Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

