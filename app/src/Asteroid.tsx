import type { AsteroidType } from '../routes/index';

export function Asteroid({ asteroid }: { asteroid: AsteroidType }) {
  return <div
    key={asteroid.id}
    data-tip={[
      `Name: ${asteroid.name}`,
      `Potentially Hazardous?: ${asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}`,
      `Miss Distance: ${Math.floor(asteroid.miss_distance).toLocaleString("en-US")} miles`
    ].join('<br />')}
    style={{
      position: 'absolute',
      backgroundColor: 'grey',
      borderRadius: '50%',
      width: Math.abs(asteroid.absolute_magnitude_h),
      height: Math.abs(asteroid.absolute_magnitude_h),
      left: `calc(${Math.abs(asteroid.miss_distance / 100000)}px + 10vw)`,
      top: `calc(${Math.abs(asteroid.css_position)}px + 10vh)`
    }}
  />
}
