import React, { Component } from "react";
import { database } from "./firebase";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import axios from "../components/common/axios-orders";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  

  componentDidMount() {
    database.ref('orders').on("value", (snapshot) => {
      if (snapshot.val()!==null) {
        const datas = Object.values(snapshot.val());
      console.log(snapshot.val())
        this.setState({movies: datas});}
    });




    //const { data: orders } = await axios.get("/orders.json");
    //եթե orders կա
   // if (orders) {
   //   const datas = Object.values(orders);
   //   this.setState({ movies: datas });
   // }
  }


  handleDelete = movie => {
    let arr = [...this.state.movies];
    let newarr = arr.filter(m => m.id !== movie);
    console.log(newarr);
    axios.delete("/orders.json");
    newarr.forEach(function(item) {
      axios.post("/orders.json", item);
    });
    this.setState({ movies: newarr });

    console.log(movie);
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

    if (count === 0)
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
  }
}

export default Movies;
