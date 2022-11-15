import "./App.css";
import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import DogCard from "./DogCard";
const myDogPath = "https://dog.ceo/api/breeds/image/random/50";
//http://www.omdbapi.com/?apikey=c032e2d7

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //empty in useState because search bar at the start is empty
  const searchDogs = async (title) => {
    const response = await fetch(`${myDogPath}&s=${title}`); //this will call the API
    const data = await response.json(); //once we get a response, we need to get the data from it
    //console.log(data.Search); //inside json, we should have the data about the movies
    setDogs(data.Search); //give accesss to dogs
  };
  useEffect(() => {
    searchDogs("corgi");
  }, []);
  return (
    <div className="app">
      <h1>Search Dogs</h1>
      <div className="search">
        <input
          placeholder="Search for dogs"
          value={searchTerm}
          onChange={(d) => setSearchTerm(d.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchDogs(searchTerm)}
        />
      </div>
      {dogs?.length > 0 ? (
        <div className="container">
          {dogs.map((dog) => (
            <DogCard dog={dog} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Dogs Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
