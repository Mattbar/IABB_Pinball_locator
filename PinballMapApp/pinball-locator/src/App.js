import { useState } from 'react';
import Table from './components/Table';
import './App.css';

const BASEURL = 'http://pinballmap.com/api/v1/'
// Takes large object and reduce it to only values we need, passed in as the array
const reduceObject = (dataObj, valuesArr) => {
  return (
    Object.keys(dataObj).reduce((next, key) => {
      if (valuesArr.includes(key)) {
        return { ...next, [key]: dataObj[key] }
      } else {
        return next;
      }
    }, {})
  );
}
function App() {
  const [longitude, setLongitude] = useState('');
  const [lat, setLat] = useState('');
  const [machines, setMachines] = useState([]);
  const [location, setLocation] = useState([]);
  const [errors, setErrors] = useState();
  const locationHeaders = ['name', 'street', 'city', 'state']

  const getLocation = async () => {
    if(lat === '' || longitude === '') {
      setErrors('Must input both Latitude and Longitude');
      return;
    }

    const request = `${BASEURL}locations/closest_by_lat_lon.json?lat=${lat};lon=${longitude};max_distance=500`;
    const data = await fetch(request)
                  .then((res) => {
                    return res.json();
                  })
                  .catch((err) => {
                    setErrors(`Error: ${err}`);
                    console.log(err);
                  })

    if(data.errors){
      setErrors(data.errors);
      return;
    }
    if(errors){
      setErrors();
    }
    const newLoc = reduceObject(data.location, locationHeaders);
    setLocation([newLoc]);
    setMachines(data.location.machine_names);
  };

  const handleFindMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const handleDisabled = () => lat !== '' && longitude !== '';
  

  return (
    <div className="App">
      <h1>Pinball Locations Near Me</h1>
      <label htmlFor="latitude">Latitude</label>
      <input
        name="latitude"
        type='number'
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <label htmlFor="longitude">Longitude</label>
      <input
        name="longitude"
        value={longitude}
        type='number'
        onChange={(e) => setLongitude(e.target.value)}
      />
      <div className='buttons'>
        <button className='action_btn' onClick={handleFindMe}>Locate Me</button>
        <button className='action_btn' disabled={handleDisabled} onClick={() => getLocation()}>Submit</button>
      </div>
      {errors && (
        <h3 style={{color: 'red'}}>{errors}</h3>
      )}
      {location.length > 0 && !errors && (
        <div>
          <h3>Location:</h3>
          <Table list={location} colNames={locationHeaders} />
          <h3>Machines:</h3>
          <ol>
            {machines.map((machine, index) => (
              <li key={`${machine}-${index}`}>{machine}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
