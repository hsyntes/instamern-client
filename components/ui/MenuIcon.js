const MenuIcon = ({ onClick }) => (
  <span className="active:opacity-20 transition-all" onClick={onClick}>
    <div
      style={{ height: "0.75px" }}
      className="bg-dark dark:bg-white w-8 rounded-full mb-1 ms-auto"
    />
    <div
      style={{ height: "0.75px" }}
      className="bg-dark dark:bg-white w-6 rounded-full mb-1 ms-auto"
    />
    <div
      style={{ height: "0.75px" }}
      className="bg-dark dark:bg-white w-4 rounded-full ms-auto"
    />
  </span>
);

export default MenuIcon;
