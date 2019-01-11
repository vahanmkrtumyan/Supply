import React, { Component } from "react";
import { database } from "./firebase";
import { Link } from "react-router-dom";
import OrdersTable from "./ordersTable";
import OrdersTableUser from "./ordersTableUser";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import OrderView from "../components/orderView";
import _ from "lodash";
import SearchBox from "./searchBox";
import { ClipLoader } from "react-spinners";
import "./Spinner.css";
import "./UI/Modal/modal.css";
import Backdrop from "./UI/Backdrop/backdrop";

class Orders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "id", order: "asc" },
    loading: true,
    show: false,
    order: {}
  };

  componentDidMount() {
    database.ref("orders").on("value", snapshot => {
      if (snapshot.val() !== null) {
        const datas = Object.values(snapshot.val());
        this.setState({ orders: datas, loading: false });
      }
    });
  }

  handleDelete = order => {
    database
      .ref()
      .child("orders")
      .child(order)
      .remove();
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

  openModal = order => {
    this.setState({ order, show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      orders: allOrders
    } = this.state;

    let filtered = allOrders.filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const orders = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: orders };
  };

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, sortColumn, searchQuery, show } = this.state;

    if (this.state.loading)
      return (
        <div className="Spinner">
          <ClipLoader
            color={"#123abc"}
            loading={this.state.loading}
            size={200}
          />
        </div>
      );
    /*if (count === 0 && (!user || user.email !== "vahanmkrtumyan@gmail.com"))
      return (

        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>
        </div>
      ); */

    if (count === 0 /*&& user && user.email === "vahanmkrtumyan@gmail.com"*/)
      return (
        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>
          <Link
            to="/orders/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Նոր հայտ
          </Link>
        </div>
      );
    const { totalCount, data: orders } = this.getPagedData();

    //if (user && user.email === "vahanmkrtumyan@gmail.com")
    return (
      <div className="row">
        <div className="col">
          <Link
            to="/orders/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Նոր հայտ
          </Link>
          <p>Ընդամենը {totalCount} հայտարարություն։</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <OrdersTable
            orders={orders}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onUpdate={this.handleUpdate}
            onSort={this.handleSort}
            onOpen={this.openModal}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <OrderView
          order={this.state.order}
          close={this.closeModal}
          show={this.state.show}
        />
        <Backdrop show={show} close={this.closeModal}/>
      </div>
    );

    /*return (
      <div className="row">
        <div className="col-3" />
        <div className="col">
          <p>Ընդամենը {totalCount} հայտարարություն։</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <OrdersTableUser
            orders={orders}
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
    );*/
  }
}

export default Orders;
