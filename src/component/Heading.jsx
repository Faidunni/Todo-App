import Moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-moon.svg";

function Heading({ isLight, onClickIcon }) {
  return (
    <div className="todo">
      <h1>TODO</h1>
      <div onClick={onClickIcon}>
        {isLight ? <img src={Moon} alt="" /> : <img src={sun} alt={sun} />}
      </div>
    </div>
  );
}

export default Heading;
