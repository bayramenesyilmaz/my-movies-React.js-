import axios from "axios";
import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import {
    Routes,
    Route,
} from "react-router-dom";
import EditMovie from "./EditMovie";

class App extends React.Component {
    state = {
        movies: [],

        searchQuery: ""
    }

    // AXİOS İLE GET

    async componentDidMount() {
        const baseURL = "http://localhost:3002/movies"
        const response = await axios.get(baseURL)
        this.setState({ movies: response.data })
    }

    //AXİOS İLE DELETE

    removeMovie = async (movie) => {

        const baseURL = `http://localhost:3002/movies/${movie.id}`
        await axios.delete(baseURL)

        const newMovieList = this.state.movies.filter(m => m !== movie)


        this.setState(state => ({ movies: newMovieList }))
    }

    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (name, rating, overview, imageURL, id) => {
        const newMovie = {
            name: name,
            rating: rating,
            overview: overview,
            imageURL: imageURL,
            id: id
        }

        const baseURL = "http://localhost:3002/movies"
        await axios.post(baseURL, newMovie)
    }

    updatedMovie = async (id, onMovie) => {

        const baseURL = `http://localhost:3002/movies/${id}`
        await axios.put(baseURL, onMovie)
    }

    render() {

        let filtiredMovies = this.state.movies.filter(movie => {
            return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        }).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        });


        return (

            <div className="container ">
                <Routes>

                    <Route path="/" element={
                        <>
                            <div className="row">
                                <div className="col-lg-12">

                                    <SearchBar onSearch={this.searchMovie} />

                                </div>
                            </div>

                            <MovieList movies={filtiredMovies} onRemove={this.removeMovie} />
                        </>
                    } >

                    </Route>

                    <Route path="/add" element={<AddMovie onAddMovie={this.addMovie} />} />
                    <Route path="/edit/:id" element={<EditMovie onUpdatedMovie={this.updatedMovie} />} />

                </Routes>

            </div>

        )
    }
}

export default App;