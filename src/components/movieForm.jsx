import React from "react";
import { database } from "./firebase";
import Form from "./common/form";
import { getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    }
  };

  async componentDidMount() { 
    
    
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: this.state.data.title,
      title: this.state.data.title,
      genre: this.state.data.genre,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate
    };
    database.ref().child("orders").push(data);

    //axios.post("/orders.json", data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h2>Նոր հայտարարություն</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Հայտարարության համար")}
          {this.renderInput("genre", "Ապրանք")}
          {this.renderInput("numberInStock", "Ծավալ", "number")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
