import { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantEntry from './RestaurantEntry';
import ENDPOINTS from '../config/endpoints.js';

const RestaurantList = (props) => {

  const [restaurants, setRestaurants] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        ENDPOINTS.restaurants
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