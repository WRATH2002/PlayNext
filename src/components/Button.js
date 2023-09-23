const Button = ({ name }) => {
  return (
    <>
      <button
        className="flex justify-center items-center h-[30px] rounded-lg  whitespace-nowrap px-[10px] mx-[8px] bg-[#eaeaea] hover:bg-[#b8b8b8] "
        style={{ transition: ".3s" }}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
