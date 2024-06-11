import "./Header.scss";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Logo />
          <Navbar />
        </div>
      </div>
    </header>
  );
}

{
}
