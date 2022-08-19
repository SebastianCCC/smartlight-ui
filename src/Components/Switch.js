import { useContext } from 'react'
import { LampContext } from '../Utility/LampContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Icon = () => {
  const config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }
  const { sliderVal, setSliderVal } = useContext(LampContext)
  const [lightState, setLightState] = useState(null)
  const [hasLoaded, setHasloaded] = useState(null)

  const { pathname } = useLocation()
  const id = pathname.replace('/', '')
  useEffect(() => {
    axios
      .get(
        'http://' +
          process.env.REACT_APP_IP +
          '/api/' +
          process.env.REACT_APP_USERNAME +
          '/groups/' +
          id
      )
      .then((res) => {
        setLightState(res.data.action.on)
        setHasloaded(true)
        /*         console.log(lightState) */
      })
  }, [])
  useEffect(() => {
    axios.put(
      'http://' +
        process.env.REACT_APP_IP +
        '/api/' +
        process.env.REACT_APP_USERNAME +
        '/groups/' +
        id +
        '/action',
      JSON.stringify({ on: lightState }),
      config
    )
    /*     console.log(lightState) */
  }, [lightState])
  return (
    <>
      {hasLoaded && (
        <button
          className="bg-white w-8 h-8 flex justify-center items-center absolute rounded-full cursor-pointer top-[-40px] right-0 shadow-md"
          onClick={() => {
            setSliderVal(parseInt(sliderVal) && lightState ? '0' : '100')
            setLightState(!lightState)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17.536"
            height="17.819"
            viewBox="0 0 17.536 17.819"
          >
            <path
              fill={parseInt(sliderVal) && lightState ? '#FF9898' : '#CECECE'}
              d="M14.421 1.913a8.767 8.767 0 11-10.189 0 .851.851 0 011.237.272l.559.993a.848.848 0 01-.233 1.1 5.939 5.939 0 107.067 0 .843.843 0 01-.23-1.092l.559-.993a.847.847 0 011.23-.276zm-3.676 7.421V.849A.846.846 0 009.9 0H8.765a.846.846 0 00-.849.849v8.485a.846.846 0 00.849.849H9.9a.846.846 0 00.845-.849z"
              data-name="Icon awesome-power-off"
              transform="translate(-.563)"
            ></path>
          </svg>
        </button>
      )}
    </>
  )
}

export default Icon
