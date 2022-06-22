import React from "react";
import { Link } from "react-router-dom";

class MovieList extends React.Component {
    constructor(props) {
        super();

    }

    handleClick = (event) => {
        this.props.onRemove(event)
    }

    handleEditClick = (event)=>{
        
    }

    truncateOverview = (string, maxLenght)=>{
        if(!string) return null;
        if(string >= maxLenght) return string;
        return `${string.substring(0,maxLenght)}...`
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.movies.map(movie => (
                        <div className="col-4 "  key={movie.id} id={movie.id}>
                            <div className="card mb-4 shadow-sm" >
                                <img src={movie.imageURL} className="card-img-top" alt="movie-img" />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.name}</h5>
                                    <p className="card-text">{this.truncateOverview(movie.overview, 100)}</p>
                                    <div className="d-flex justify-content-between aling-items-center">
                                        <div>
                                            <button type="button" className="btn btn-md btn-outline-danger mx-2" onClick={() => this.handleClick(movie)}>Delete</button>
                                            
                                            <Link to={`edit/${movie.id}`} type="button" className="btn btn-md btn-outline-success">
                                                Edit
                                            </Link>
                                            
                                        </div>
                                        <h2><span className="badge bg-secondary">{movie.rating}</span></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    }
}
export default MovieList;