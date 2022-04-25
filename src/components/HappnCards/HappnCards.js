import React, { useEffect, useState } from "react";
import HappnCard from "react-tinder-card";
import "./HappnCards.css";
import { getPeople } from "../../api/api";
import Graph from "../../algorithm/Graph.js";
import { mergeSort } from "../../algorithm/merge.js";

function HappnCards() {
  const [people, setPeople] = useState([]);
  const [distance, setDistance] = useState([]);

  async function fetchPeople() {
    const peopleList = await getPeople();
    setPeople(peopleList)
    createGraph(peopleList)
    sorting(peopleList)
  }



  async function createGraph(peopleList) {

    let g = new Graph();

    let first = ""
    let distances = await peopleList.map((person, index) => {
      g.addVertex(person.id)
      if (index === 0) {
        first = person.id
      }
      if (index > 0) {
        console.log(`id = ${first}`, person.id, person.distance)
        g.addEdge(`${first}`, person.id, person.distance);
      }
      return { id: person.id, distance: person.distance }
    })

    setDistance(distances)
    console.log(distances)

    g.dijkstra(distances[0].id);
  }




  async function sorting(peopleList) {

    let distances = await peopleList.map((person) => {
      console.log('Os valores da distancia: ', person.distance);
      return (person.distance)
    })

    setDistance(distances)
    console.log("aqui", distances)

    let ids = mergeSort(distances)
    console.log("id", ids)

    let ordenado = await peopleList.forEach((person, index) => {

    })
    console.log("ord", ordenado)
  }




  useEffect(() => {
    fetchPeople()
  }, [])

  const swiped = (nameToDelete) => {
    console.log("removing: " + nameToDelete);

  };

  return (
    <div className="happnCards">
      <div className="happnCardsContainer">
        {people && people.map((person) => (
          <HappnCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.distance)} //swiped(dir, person.name)}
            onCardLeftScreen={() => { }} //outOfFrame(person.name)}
          >

            <div
              className="card"
              style={{ backgroundImage: `url(${person.avatar})` }}
            >
              <h2>{person.name}</h2>
              <h3>{person.distance} KM</h3>
            </div>

            <></>

          </HappnCard>
        ))}
      </div>
    </div>
  );
}

export default HappnCards;
