import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Հայտարարության համար",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre", label: "Անվանում" },
    { path: "numberInStock", label: "Ծավալ" },
    { path: "dailyRentalRate", label: "Վերջնաժամկետ" },
    {
      key: "update",
      content: movie => (
        <Link to={`/movies/${movie._id}`}>
          <button
            onClick={() => this.props.onUpdate(movie)}
            className="btn btn-primary btn-sm"
          >
            Update
          </button>
        </Link>
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
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

export default MoviesTable;
