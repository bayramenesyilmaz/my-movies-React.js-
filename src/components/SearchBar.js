import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {


    handlerSubmit = (event) => {
        event.preventDefault();
    }




    render() {

        return (
            <form onSubmit={this.handlerSubmit}>
                <div className="form-row mb-5 d-flex justify-content-between ">
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search a movie"
                            onChange={event => this.props.onSearch(event)}

                        />
                    </div>

                    <div className="col-2">
                        <Link
                            to="/add"
                            className="btn btn-danger"
                            style={{ float: "right" }}
                            type="button"
                        >
                            Add Movie
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}
export default SearchBar;