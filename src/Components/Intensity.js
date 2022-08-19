import { useContext } from 'react'
import { ReactComponent as BulbOffIcon } from '../assets/svg/bulbOff.svg'
import { ReactComponent as BulbOnIcon } from '../assets/svg/bulbOn.svg'
import { LampContext } from '../Utility/LampContext'
import DetailTitle from './DetailTitle'
import { useState, useRef, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { throttle } from 'lodash'

const Intensity = () => {
  const config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }
  const { sliderVal, setSliderVal } = useContext(LampContext)
  const [defaultBri, setDefaultBri] = useState(null)
  const [hasloaded, setHasloaded] = useState(false)
  const brightness = useRef(null)

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
        setDefaultBri(res.data.action.bri)
        setHasloaded(true)
        /*         console.log(res.data.state) */
      })
  }, [])

  defaultBri && console.log(defaultBri)

  const ChangeBri = () => {
    const inputvalue = brightness.current.value
    axios.put(
      'http://' +
        process.env.REACT_APP_IP +
        '/api/' +
        process.env.REACT_APP_USERNAME +
        '/groups/' +
        id +
        '/action',
      JSON.stringify({ bri: parseInt(inputvalue) }),
      config
    )
    console.log(inputvalue)
  }

  const Throttle = useMemo(() => throttle(ChangeBri, 1000), [])

  return (
    <section>
      <DetailTitle title="Intensity" />
      <div className="flex items-center">
        <BulbOffIcon className="w-10" />
        {hasloaded && (
          <input
            className="slider"
            onChange={Throttle}
            type="range"
            name="sat"
            min="0"
            max="243"
            defaultValue={defaultBri}
            ref={brightness}
          />
        )}
        {/*         <input
          className="slider"
          type="range"
          min="0"
          max="100"
          value={sliderVal ? sliderVal : 100}
          onChange={(e) => setSliderVal(e.target.value)}
        /> */}
        <BulbOnIcon className="w-10" />
      </div>
    </section>
  )
}

export default Intensity
