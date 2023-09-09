import React from "react";

const TableHead = ({ headerValues }) => {
  return (
    <thead>
      <tr>
        {headerValues.map((val) => (
          <th className="bg-[#c0e3e5] p-3 border border-slate-300 uppercase">
            {val}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
