import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    // class component
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        // console.log("clicked!");
        axios
            .post("/registration", this.state)
            .then(({ data }) => {
                console.log("data:", data);
                if (data.success === true) {
                    if (data.user_status) {
                        location.replace("/family");
                    } else {
                        location.replace("/sitter");
                    }
                } else if (data.success === false) {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST/ registration:", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },

            () => console.log("this state after setState:", this.state)
        );
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <h2 className="errorMsg">
                        Sorry, something went wrong.Please check your
                        information!
                    </h2>
                )}
                <div className="userForm">
                    <select
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.value}
                        name="status"
                    >
                        <option value="sitter">Pet Sitter</option>
                        <option value="family">Pet Family</option>
                    </select>
                    <input
                        className="regInputs"
                        name="first"
                        placeholder="first"
                        onChange={(e) => this.handleChange(e)} // binding the changes/ not to get undefined
                    />
                    <input
                        className="regInputs"
                        name="last"
                        placeholder="last"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        className="regInputs"
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        className="regInputs"
                        name="password"
                        placeholder="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="regButton"
                        onClick={() => this.handleClick()}
                    >
                        Register
                    </button>
                </div>
                <Link className="loginMsg" to="/login">
                    If you are already registered, click here to Log in!
                </Link>
            </div>
        );
    }
}