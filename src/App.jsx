import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

import functions from './functions/functions.js'

function App() {
  
  const [cities, setCities] = useState([]);
  const [votesPerCity, setVotesPerCity] = useState([]);
  const [cityById, setCityById] = useState({});

  async function getCities() {
    setCities(await functions.getCities());
  }

  function getCityById(cityId) {
    if (cities.length > 0) {
      let city = cities.find(item => item.id === cityId);
      setCityById({ ...city });
    }
  }

  async function getVotesPerCity(cityId) {
    if (cityById) {
      setVotesPerCity(await functions.getVotesPerCity(cityId));
    }

  }

  function onClick(e) {
    getCityById(e.target.id);
    return getVotesPerCity(e.target.id)
  }

  useEffect(() => {
    getCities();
  }, []) 
  useEffect(() => {
    getVotesPerCity();
  }, [cities])

  return (
    <>
      <div className='px-2 py-2 flex'>
      {cities.map((item, i) => {
        return (
          <div className='px-2 py-2'  key={i}>
            <button className='px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={onClick} id={item.id}>{item.name}</button>
          </div>
        )
      })}

      </div>
      <hr />
      {cityById.id ?
        <div className="px-2 py-2 flex" >
          <p className="px-2 py-2">{cityById.name}</p>
          <p className="px-2 py-2">Presence: {cityById.presence}</p>
          <p className="px-2 py-2">Absence: {cityById.absence}</p>
          <p className="px-2 py-2">Voting Population: {cityById.votingPopulation}</p>
        </div>
        : <p className='px-2 py-2'>Choose a city  </p>}
      <hr />
      <div className=' flex justify-center'>
      {votesPerCity.map((item, i) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-2" key={i}>
              <div className="px-6 py-4">
              <h1 className="text-gray-700 font-bold text-center py-4">{item.candidateName}</h1>
              <p className="text-gray-700 text-base">Votes received: {item.votes.toLocaleString("pt-BR")}</p>
              <p className="text-gray-700 text-base">Percentage: {item.percentage} %</p>
              <p clclassName="text-gray-700 text-base">The candidate {item.elected ? "was elected" : "wasn't elected"}</p>
              </div>
            </div>
          )
      })}

      </div>
    </>
  )
}

export default App
