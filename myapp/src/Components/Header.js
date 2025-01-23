import "./Header.css";
const Header = ({ title }) => {
    return (
      <div>
       <div className="header_font">
        <div className="font_header">{title}</div>
        </div>
      </div>
    );
  };


export default Header;