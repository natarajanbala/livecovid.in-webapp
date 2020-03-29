import React, { useState, useEffect } from "react";
import SortIcon from "./SortIcon";

const sortDistricts = (districtArray, currentOrder, activeSortingKey) => {
  return Object.keys(districtArray).sort((a, b) => {
    if (a == "Unknown") return 1;
    if (b == "Unknown") return -1;
    return (
      currentOrder *
      (parseInt(districtArray[b][activeSortingKey]) -
        parseInt(districtArray[a][activeSortingKey]))
    );
  });
};

const RowTableAccordion = ({ districts, isHidden }) => {
  const [districtSortOrder, setDistrictSortOrder] = useState(
    Object.keys(districts)
  );
  const [activeSortingKey, setActiveSortingKey] = useState("confirmed");
  const [currentOrder, setCurrentOrder] = useState(1);

  const handleSorting = newActiveSortingKey => {
    let newCurrentOrder = 1;
    if (newActiveSortingKey === activeSortingKey) {
      newCurrentOrder = currentOrder * -1;
    }
    setDistrictSortOrder(
      sortDistricts(districts, currentOrder, newActiveSortingKey)
    );
    setActiveSortingKey(newActiveSortingKey);
    setCurrentOrder(newCurrentOrder);
  };

  useEffect(() => {
    handleSorting("confirmed");
  }, []);
  return (
    <tr className={"fold" + (isHidden ? " close" : "")}>
      <td colSpan="5">
        <div className="districts-table">
          <table>
            <thead>
              <tr>
                <th>District</th>
                <th
                  onClick={() => {
                    handleSorting("confirmed");
                  }}
                >
                  <div className="title">Confirmed</div>
                  {activeSortingKey === "confirmed"
                    ? SortIcon(currentOrder)
                    : null}
                </th>
              </tr>
            </thead>
            <tbody>
              {districtSortOrder.map(districtName => {
                return (
                  <tr key={districtName}>
                    <td>{districtName}</td>
                    <td>{districts[districtName].confirmed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

export default RowTableAccordion;