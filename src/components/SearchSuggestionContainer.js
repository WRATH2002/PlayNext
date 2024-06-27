import { GoSearch } from "react-icons/go";

const SearchSuggestionContainer = (props) => {
  return (
    <>
      <div className="mx-[15px] h-[20px] text-[black] font-[roboto]  w-full flex justify-start items-center bg-transparent">
        <GoSearch className="mr-[15px]" />
        <span>{props.data}</span>
      </div>
    </>
  );
};

export default SearchSuggestionContainer;
