import { GoSearch } from "react-icons/go";

const SearchSuggestionContainer = (props) => {
  return (
    <>
      <div className="m-[15px] my-[10px] h-[20px] bg-white w-[95%] flex justify-start items-center">
        <GoSearch className="mr-[15px]" />
        <span>{props.data}</span>
      </div>
    </>
  );
};

export default SearchSuggestionContainer;
