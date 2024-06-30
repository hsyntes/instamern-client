const MenuIcon = ({ onClick }) => (
  <span className="active:opacity-20 transition-all" onClick={onClick}>
    <div className="bg-secondary h-0.5 w-8 rounded-full mb-1 ms-auto" />
    <div className="bg-secondary h-0.5 w-6 rounded-full mb-1 ms-auto" />
    <div className="bg-secondary h-0.5 w-4 rounded-full ms-auto" />
  </span>
);

export default MenuIcon;
