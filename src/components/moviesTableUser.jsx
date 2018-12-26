import React, { Component } from "react";
import Table from "./common/table";

class MoviesTableUser extends Component {
  
  columns = [
    {
      path: "title",
      label: "Հայտարարության համար" },
    { path: "genre", label: "Անվանում" },
    { path: "numberInStock", label: "Ծավալ" },
    { path: "dailyRentalRate", label: "Վերջնաժամկետ" },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTableUser;
