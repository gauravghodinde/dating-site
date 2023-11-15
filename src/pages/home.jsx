import React, { useEffect, useState } from "react";
import MyNavbar from "../components/navbar";
import { MyCard } from "../components/card";
import "../styles/homeStyle.css";
import data from "./data.json";
// import Deck from './decj'
// import TinderCard from "react-tinder-card";

import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";


const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;


export const Home = () => {

  const [link, updateLink] = useState(
    "https://files.cults3d.com/uploaders/24454218/illustration-file/6c53e2bf-b971-49fb-bfa5-52fa6ffa6c0d/Cat-cool.jpg"
  );
  const [title, updateTitle] = useState("Spencer");
  const [catPhrase, updateCatPhrases] = useState(
    '"Ready to pounce into your heart, swipe right to experience the purr-fection!"'
  );

  const [person, updateData] = useState([]);
  const swiped = (direction, nameToDelete) => {
    console.log(`i'm in swiped`, nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(`enough tinder today`);
  };
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  return (
    <div className="body">
      <MyNavbar />

      <div className="centerCard">
        {data.map((user, index) => 
          
            // <TinderCard
            //   key={index}
            //   className="swipe"
            //   preventSwipe={[`up`, `down`]}
            //   onSwipe={(dir) => swiped(dir, person.name)}
            //   onCardLeftScreen={() => outOfFrame(person.name)}
            // >
              
              <MyCard
                style={{ zIndex: index++ }}
                key={index++}
                text={user.catchphrase}
                imgSrc={user.imageLink}
                title={user.name}
              />
            // </TinderCard>
          
        )}
      </div>
    </div>
  );
};

export default Home;
