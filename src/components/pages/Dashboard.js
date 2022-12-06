import { useState, useEffect } from "react";
import PeopleItem from "../people/PeopleItem";

export default function Dashboard() {
  const [people, setPeople] = useState([]);

  function renderPeople() {
    return people.map((character) => {
      return <PeopleItem key={character.uid} {...character} />;
    });
  }

  useEffect(() => {
    fetch("https://swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
      })
      .catch((err) => {
        console.error("Get people error: ", err);
      });
  }, []);

  return (
    <div>
      <h1>Howdy</h1>

      {people.length > 0 ? renderPeople() : "...Loading"}
    </div>
  );
}
