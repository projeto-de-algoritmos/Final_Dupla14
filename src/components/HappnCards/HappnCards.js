import React, { useEffect, useState } from "react";
import HappnCard from "react-tinder-card";
import "./HappnCards.css";
import { getPeople } from "../../api/api";
import Graph from "../../algorithm/Graph.js";
import { mergeSort } from "../../algorithm/merge.js";
import SwipeButtons from "../SwipeButtons/SwipeButtons";

function HappnCards() {
  const [people, setPeople] = useState([]);
  const [distance, setDistance] = useState([]);

  async function fetchPeople() {
    const peopleList = await getPeople();
    setPeople(peopleList);
    createGraph(peopleList);
    sorting(peopleList);
  }

  async function createGraph(peopleList) {
    let g = new Graph();

    let first = "";
    let distances = await peopleList.map((person, index) => {
      g.addVertex(person.id);
      if (index === 0) {
        first = person.id;
      }
      if (index > 0) {
        console.log(`id = ${first}`, person.id, person.distance);
        g.addEdge(`${first}`, person.id, person.distance);
      }
      return { id: person.id, distance: person.distance };
    });

    setDistance(distances);
    console.log(distances);

    g.dijkstra(distances[0].id);
  }

  async function sorting(peopleList) {
    let distances = await peopleList.map((person) => {
      console.log("Os valores da distancia: ", person.distance);
      return person.distance;
    });

    setDistance(distances);
    console.log("aqui", distances);

    let ordDistances = mergeSort(distances);
    console.log("id", ordDistances);

    let ordPeopleList = [];

    for (let j = 0; j < ordDistances.length; j++) {
      for (let i = 0; i < peopleList.length; i++) {
        if (ordDistances[j] === peopleList[i].distance) {
          console.log("for", peopleList[i].distance);
          ordPeopleList.push(peopleList[i]);
        }
      }
    }

    ordPeopleList.reverse();

    setPeople(ordPeopleList);

    console.log("Lista de Pessoas Ordenadas", ordPeopleList);
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: ", direction, nameToDelete);
  };

  return (
    <>
      <div className="happnCards">
        <div className="happnCardsContainer">
          {people &&
            people.map((person) => (
              <HappnCard
                className="swipe"
                key={person.id}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.distance)} //swiped(dir, person.name)}
                onCardLeftScreen={() => {}} //outOfFrame(person.name)}
              >
                <div
                  className="card"
                  style={{ backgroundImage: `url(${person.avatar})` }}
                >
                  <h2>{person.name}</h2>
                  <h3>{person.distance} KM</h3>
                </div>
              </HappnCard>
            ))}
        </div>
      </div>
    </>
  );
}

export default HappnCards;
