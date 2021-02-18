// function component를 사용할 때는 없어도 됐는데 class component는 필요하다.
import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    muvies: []
  }

  getMovides = async() => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading:false})
  }

  componentDidMount() {
    this.getMovides();
  }

  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="cotainer">
        {isLoading?
        (<div className="loader"><span className="loader_text">Loading...</span></div>
        ):(
        <div className="movies">
          {movies.map(movie => (
          <Movie 
          key={movie.id} 
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary} 
          poster={movie.medium_cover_image} 
          genres={movie.genres}/>
        ))}
        </div>
        )}
      </section>
    );
  }

}

export default App;
