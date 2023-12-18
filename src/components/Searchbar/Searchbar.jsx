import { useState } from "react";
import css from "./searchBar.module.css"


const SearchBar = ({getInputValue})  => {
    const [input, setInput] = useState ("")

    const search = (event) => {
        event.preventDefault ()
        getInputValue(input)
        setInput("")
    }

    const handleChange= event => {
        setInput(event.target.value)
    }

    
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={search}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        name="input"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                        value={input}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    };




export default SearchBar