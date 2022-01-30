import { useLoaderData } from "remix";
import { useEffect, useState } from "react";
import { Earth } from "../src/Earth";
import { Asteroid } from "../src/Asteroid";
import ReactTooltip from "react-tooltip";

export interface AsteroidType {
  id: string    
  name: string
  absolute_magnitude_h: number
  is_potentially_hazardous_asteroid: boolean,
  close_approach_data: CloseApproachData[],
  miss_distance: number,
  css_position: number
}

interface CloseApproachData {
  miss_distance: {
    miles: number
  }
}

export const loader = async () => {
  const date = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
  const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${process.env.API_KEY}`);
  const asteroids = await response.json();
  return asteroids.near_earth_objects[date].map((a: AsteroidType) => {
    return {
      id: a.id,
      name: a.name,
      absolute_magnitude_h: a.absolute_magnitude_h,
      is_potentially_hazardous_asteroid: a.is_potentially_hazardous_asteroid,
      miss_distance: a.close_approach_data && a.close_approach_data.length ? a.close_approach_data[0].miss_distance.miles : 0,
      css_position: Math.floor(Math.random() * 700)
    };
  });
};

export default function Index() {
  const asteroids = useLoaderData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), [setIsClient]);

  return (
      <>
        {isClient && <ReactTooltip multiline={true} />}
        <h1 style={{
          textAlign: 'center',
          position: 'fixed',
          left: 0,
          bottom: 0,
          height: 30,
          width: '100%'
        }}>Asteroids near Earth, today.</h1>
        <Earth />
          {asteroids.map((asteroid: AsteroidType) => (
            <Asteroid asteroid={asteroid} key={asteroid.id}/>
          ))}
      </>
  );
}
