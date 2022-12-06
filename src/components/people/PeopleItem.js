import { Link } from "react-router-dom";

export default function PeopleItem(props) {
  return (
    <div>
      <h5>
        <Link exact="true" to={`/dashboard/${props.uid}`}>
          {props.name}
        </Link>
      </h5>
    </div>
  );
}
