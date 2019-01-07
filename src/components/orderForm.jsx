import React from "react";
import { database } from "./firebase";
import Form from "./common/form";

class OrderForm extends Form {
  state = {
    movies: [],
    data: {
      id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
      comment: ""
    }
  };

  componentDidMount() {
    database.ref("orders").on("value", snapshot => {
      if (snapshot.val() !== null) {
        const datas = Object.values(snapshot.val());

        this.setState({ movies: datas }, () => {
          const getMovie = id => {
            return this.state.movies.filter(m => m.id === id);
          };
          const movieId = this.props.match.params.id;
          if (movieId === "new") return;
          const movie = getMovie(movieId);
          if (!movie) return this.props.history.replace("/not-found");
          this.setState({ data: this.mapToViewModel(movie[0]) });
        });
      }
    });
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      comment: movie.comment
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: this.state.data.title,
      title: this.state.data.title,
      genre: this.state.data.genre,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate,
      comment: this.state.data.comment
    };
    database
      .ref()
      .child("orders")
      .child(this.state.data.title)
      .set(data);

    //axios.post("/orders.json", data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h2>Նոր հայտարարություն</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Հայտարարության համար", "", "1")}
          {this.renderInput("genre", "Ապրանք")}
          {this.renderInput("numberInStock", "Ծավալ", "number")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
          {this.renderInput("comment", "Մեկնաբանություն")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
