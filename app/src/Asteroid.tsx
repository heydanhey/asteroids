export function Asteroid({ asteroid }) {
  return <div
    key={asteroid.id}
    data-tip={[`Name: ${asteroid.name}`, `Is Hazardous?: ${asteroid.is_potentially_hazardous_asteroid}`].join('<br />')}
    style={{
      position: 'absolute',
      backgroundColor: 'grey',
      borderRadius: '50%',
      width: Math.abs(asteroid.absolute_magnitude_h),
      height: Math.abs(asteroid.absolute_magnitude_h),
      left: Math.abs(asteroid.close_approach_data[0].miss_distance.miles / 10000),
      top: asteroid.top
    }}
  />
}
