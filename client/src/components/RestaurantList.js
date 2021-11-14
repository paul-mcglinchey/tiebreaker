import { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantEntry from './RestaurantEntry';

const RestaurantList = (props) => {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/api/restaurants',
      );

      setRestaurants(result.data.data);
    }

    fetchData();
  }, [])

  return (
    <div>
      {restaurants && restaurants.map((r, i) => {
        return (
          <RestaurantEntry key={i} name={r.name} cuisine={r.cuisine} />
        )
      })}
    </div>
  )
}

export default RestaurantList;