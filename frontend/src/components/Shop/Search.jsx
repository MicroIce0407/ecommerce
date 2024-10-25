import { useState } from "react";
import icon from "../../picture/Icons/search.png";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../Store/SearchSlice";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };

  return (
    <form
      className="bg-orange-400 flex items-center justify-center m-0 p-3"
      onSubmit={searchHandler}
    >
      <input
        id="search"
        className="w-3/5 p-3 text-base border-2 border-solid border-gray-400 rounded-3xl mr-3 hover:border-green-400 hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
        value={inputValue}
        onChange={inputHandler}
        type="text"
      />
      <button type="submit">
        <img src={icon} alt="search" />
      </button>
    </form>
  );
};

export default Search;
