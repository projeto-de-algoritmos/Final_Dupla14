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
    g.dijkstra(distances[0].id);
  }


  async function sorting(peopleList) {
    let distances = await peopleList.map((person) => {
      //console.log("Distancia: ", person.distance);
      return person.distance;
    });

    setDistance(distances);
    let ordDistances = mergeSort(distances);

    let ordPeopleList = [];

    for (let j = 0; j < ordDistances.length; j++) {
      for (let i = 0; i < peopleList.length; i++) {
        if (ordDistances[j] === peopleList[i].distance) {
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
                onSwipe={(dir) => swiped(dir, person.distance)}
                onCardLeftScreen={() => { }}
              >
                <div
                  className="card"
                  style={{ backgroundImage: `url(${person.avatar})` }}
                >
                  <h2>{person.name}</h2>
                  <h1>{person.distance} Km</h1>
                  <h3>{person.age} Anos</h3>
                </div>
              </HappnCard>
            ))}
        </div>
      </div>
    </>
  );
}

export default HappnCards;
