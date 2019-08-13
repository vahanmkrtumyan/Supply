import React, { Component } from "react";
import { storage, database, firestore } from "./firebase";
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
import Logos from "./logos";
import Backdrop from "./UI/Backdrop/backdrop";

class Orders extends Component {
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
    firestore.collection("orders").onSnapshot(snapshot => {
      if (snapshot.docs !== null) {
        const datas = snapshot.docs.map(doc => {
          return { ...doc.data() };
        });
        this.setState({ orders: datas, loading: false });
      }
      if (snapshot === null) {
        this.setState({ loading: false });
      }
    });
  }

  handleDelete = order => {
    database
      .ref()
      .child("orders")
      .child(order.id)
      .remove();

    var storageRef = storage.ref("images/" + order.fileName);
    storageRef
      .delete()
      .then(function() {
        // File deleted successfully
      })
      .catch(function(error) {
        console.log(error);
      });

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
      firestore
        .collection("orders")
        .doc(`${order.id}`)
        .set(this.state.order)
    );
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  getPagedData = () => {
    let data2 = [...this.state.orders].map(item => {
      let d = Number(item.id);

      item.id = d;

      return item;
    });

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    let filtered = data2.filter(m =>
      m.name.includes(searchQuery.toLowerCase())
    );

    const sorted = _.orderBy(filtered, sortColumn.path, [sortColumn.order]);

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
    if (
      count === 0 &&
      (!user ||
        (user.email !== "vahanmkrtumyan@gmail.com" &&
          user.email !== "tashir.provider@gmail.com"))
    )
      return (
        <div>
          <p>Տվյալ պահին հայտարարություններ չկան։</p>
        </div>
      );

    if (
      count === 0 &&
      user &&
      (user.email === "vahanmkrtumyan@gmail.com" ||
        user.email === "tashir.provider@gmail.com")
    )
      return (
        <div className="box">
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

    if (
      user &&
      (user.email === "vahanmkrtumyan@gmail.com" ||
        user.email === "tashir.provider@gmail.com")
    )
      return (
        <div className="row box" /*style={{backgroundColor: '#909da6'}}*/>
          <div className="col">
            <p className="pb-15 count-text">
              Ընդամենը` <strong> {totalCount} </strong> հայտարարություն։
            </p>
            <div className="row flex pb-20">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <div className="col-sm-6 text-right">
                <Link
                  to="/orders/new"
                  className="btn"
                  style={{ marginBottom: 20 }}
                >
                  <span className="plus">+</span> <span>ավելացնել նոր</span>
                </Link>
              </div>
            </div>

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
            <Logos />
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
          <p className="pb-15 count-text">
            Ընդամենը` <strong> {totalCount} </strong> հայտարարություն։
          </p>
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
          <Logos />
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

export default Orders;
