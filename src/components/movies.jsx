import React, { Component } from "react";
import { database } from "./firebase";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import MoviesTableUser from "./moviesTableUser";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "id", order: "asc" }
  };

  componentDidMount() {
    database.ref("orders").on("value", snapshot => {
      if (snapshot.val() !== null) {
        const datas = Object.values(snapshot.val());
        this.setState({ movies: datas });
      }
    });
  }

  handleDelete = movie => {
    database
      .ref()
      .child("orders")
      .child(movie)
      .remove();
  };

  handleUpdate = movie => {
    console.log(movie);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    let table;
    if (count === 0 && user && user.email === "vahanmkrtumyan@gmail.com") {
      table= <MoviesTable
      movies={movies}
      sortColumn={sortColumn}
      onDelete={this.handleDelete}
      onUpdate={this.handleUpdate}
      onSort={this.handleSort}
    />;
    } else {
      table= <MoviesTableUser
      movies={movies}
      sortColumn={sortColumn}
      onSort={this.handleSort}
    />;
    }


    if (count === 0 && (!user || user.email !== "vahanmkrtumyan@gmail.com"))
      return (
        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>,
        </div>
      );

    if (count === 0 && user && user.email === "vahanmkrtumyan@gmail.com")
      return (
        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>,
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Նոր հայտ
          </Link>
        </div>
      );
    const { totalCount, data: movies } = this.getPagedData();

    if (user && user.email === "vahanmkrtumyan@gmail.com")
      return (
        <div className="row">
          <div className="col-3" />
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Նոր հայտ
            </Link>
            <p>Ընդամենը {totalCount} հայտարարություն։</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      );

    return (
      <div className="row">
        <div className="col-3" />
        <div className="col">
          <p>Ընդամենը {totalCount} հայտարարություն։</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onUpdate={this.handleUpdate}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
