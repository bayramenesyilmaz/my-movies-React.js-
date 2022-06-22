import React from 'react';
import axios from 'axios';

class EditMovie extends React.Component {

    state = {
        name: "",
        rating: "",
        imageURL: "",
        overview: ""
    }

    async componentDidMount() {
        //filmin id sini bulmak için yaptıüım yöntem
        const id = window.location.pathname.slice(6)

        const baseURL = `http://localhost:3002/movies/${id}`
        const response = await axios.get(baseURL)
        const movie = response.data
        this.setState({
            name: movie.name,
            rating: movie.rating,
            imageURL: movie.imageURL,
            overview: movie.overview
        })
    }

    handleFormSubmit = (e) => {

        const {name,rating,imageURL,overview} = this.state
        const id = window.location.pathname.slice(6)

        const updatedMovie = {
            name:name,
            rating:rating,
            imageURL:imageURL,
            overview:overview
        }

        this.props.onUpdatedMovie(id,updatedMovie)

        document.location.href="http://localhost:3000/"

        e.preventDefault();
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }


    render() {

        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleFormSubmit} >
                    <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Edit A Movie.." disabled />
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                className="form-control"
                                name="overview"
                                rows="5"
                                value={this.state.overview}
                                onChange={this.handleChange}></textarea>
                        </div>
                    </div>


                    <input type="submit" className="btn btn-primary btn-block col-12 mt-2" value="Edit Movie" />

                </form>
            </div>
        )

    }
}


export default EditMovie;