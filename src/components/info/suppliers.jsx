import React, { Component } from "react";
import { database } from "../firebase";
import { Link } from "react-router-dom";
import InfoTable from "./infoTable";
import OrdersTableUser from "../ordersTableUser";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import OrderView from "../orderView";
import _ from "lodash";
import SearchBox from "../searchBox";
import { ClipLoader } from "react-spinners";
import "../Spinner.css";
import "../UI/Modal/modal.css";
import Backdrop from "../UI/Backdrop/backdrop";

class Suppliers extends Component {
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 8,
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
      .child(order.id)
      .remove();

    // let image = order.fileName
    // console.log(order)

    /* database
      .ref()
      .child('images')
      .child(image)
      .delete()
      .then(() => {
        console.log(
          `Successfully deleted photo with UID: ${order}, userUID : ${order}`
        );
      })
      .catch(err => {
        console.log(`Failed to remove photo, error:`);
      }); */
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

    let orderNew = { ...order };
    orderNew.count = orderNew.count + 1;
    console.log(orderNew);

    this.setState({ order: orderNew }, () =>
      database
        .ref()
        .child("orders")
        .child(order.id)
        .set(this.state.order)
    );
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
    const { user } = this.props;
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
    if (count === 0 && (!user || user.email !== "vahanmkrtumyan@gmail.com"))
      return (
        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>
        </div>
      );

    if (count === 0 && user && user.email === "vahanmkrtumyan@gmail.com")
      return (
        <div className="box">
          <p>Տվյալ պահին հայտարարություններ չկան։</p>
          <Link
            to="/suppliers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Նոր հայտ
          </Link>
        </div>
      );
    const { totalCount, data: orders } = this.getPagedData();

    if (user && user.email === "vahanmkrtumyan@gmail.com")
      return (
        <div className="row box" /*style={{backgroundColor: '#909da6'}}*/>
          <div className="col">
            <p className="pb-15 count-text">Ընդամենը` <strong> {totalCount} </strong> հայտարարություն։</p>
            <div className="row flex pb-20">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <div className="col-sm-6 text-right">
                <Link
                  to="/suppliers/new"
                  className="btn"
                  style={{ marginBottom: 20 }}
                >
                    <span className="plus">+</span> <span>ավելացնել նոր</span>
                </Link>
              </div>
            </div>

            <InfoTable
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
          <Backdrop show={show} close={this.closeModal} />
        </div>
      );

    return (
      <div className="row box" /*style={{backgroundColor: '#909da6'}}*/>
        <div className="col">
          <p className="pb-15 count-text">Ընդամենը` <strong> {totalCount} </strong> հայտարարություն։</p>
          <div className="row flex pb-20">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>

          <OrdersTableUser
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
        <Backdrop show={show} close={this.closeModal} />
      </div>
    );
  }
}

export default Suppliers;
