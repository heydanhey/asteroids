import { useLoaderData } from "remix";
import { Earth } from "../src/Earth";
import { Asteroid } from "../src/Asteroid";
import ReactTooltip from "react-tooltip";

export const loader = async () => {
  const date = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
  const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${process.env.API_KEY}`);
  const asteroids = await response.json();
  return asteroids.near_earth_objects[date].map(a => {
    a.top = Math.floor(Math.random() * 700)
    return a;
  });
};

export default function Index() {
  const asteroids = useLoaderData();
  console.log(asteroids[0])
  return (
      <div>
        <ReactTooltip multiline={true} />
        <Earth />
          {asteroids.map(asteroid => (
            <Asteroid asteroid={asteroid} />
          ))}
      </div>
  );
}
