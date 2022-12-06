import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SingleDashboard(props) {
  const [character, setCharacter] = useState({});
  const [homeworld, setHomeworld] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getPlanetData() {
    setIsLoading(true);
    fetch(character.homeworld)
      .then((res) => res.json())
      .then((data) => {
        setHomeworld(data.result.properties.name);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Homeworld Error: ", err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // console.log(props);
    fetch(`https://swapi.tech/api/people/${props.match.params.uid}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCharacter(data.result.properties);
      })
      .catch((err) => {
        console.error("Character fetch error: ", err);
      });
  }, [props.match.params.uid]);

  return (
    <div>
      <h1>Character Data</h1>

      <div>
        <h3>Name: {character.name}</h3>
        <h3>Birth Year: {character.birth_year}</h3>
        {isLoading ? (
          <FontAwesomeIcon
            icon="circle-notch"
            spin
            style={{ color: "blue", fontSize: "1.5em" }}
          />
        ) : character.homeworld ? (
          <h3>
            Homeworld:{" "}
            {homeworld ? (
              homeworld
            ) : (
              <button onClick={getPlanetData}>Get Planet</button>
            )}
          </h3>
        ) : null}
      </div>
      <Link exact="true" to="/dashboard">
        ... Dashboard
      </Link>
    </div>
  );
}
