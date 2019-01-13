import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data, onModalOpen }) => {
  return (
      <table className="table table-hover">
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
          <TableBody onModalOpen={onModalOpen} columns={columns} data={data} />
      </table>
  );
};

export default Table;
