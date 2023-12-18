import { Component } from "react";
import css from "./searchBar.module.css"


class SearchBar extends Component {
    state = {
        input: ""
    }

    search = event => {
        event.preventDefault ()
        this.props.getInputValue(this.state.input)
        this.setState({input:''})
    }

    handleChange= event => {
        this.setState({input:event.target.value})
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.search}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        name="input"
                        type="text"
                        autoComplete="off"
                        onChange={this.handleChange}
                        value={this.state.input}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    };
}



export default SearchBar