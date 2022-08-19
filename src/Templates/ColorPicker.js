import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Color from '../Components/CurrentColor'
import DetailTitle from '../Components/DetailTitle'
import NewColor from '../Components/NewColor'
import { useLocation } from 'react-router-dom'

const LampColor = () => {
  const config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }
  const [colors, setColors] = useState([
    { red: 255, green: 155, blue: 155 },
    { red: 148, green: 235, blue: 158 },
    { red: 148, green: 202, blue: 235 },
    { red: 165, green: 148, blue: 235 },
    { red: 222, green: 148, blue: 235 },
    { red: 235, green: 208, blue: 148 },
  ])
  const [color, setColor] = useState([])
  console.log(color)

  const { pathname } = useLocation()
  const id = pathname.replace('/', '')
  useEffect(() => {
    axios.put(
      'http://' +
        process.env.REACT_APP_IP +
        '/api/' +
        process.env.REACT_APP_USERNAME +
        '/groups/' +
        id +
        '/action',
      JSON.stringify({ xy: [color.x, color.y] }),
      config
    )
  }, [color])
  const newColor = (color) => {
    setColors([...colors, color])
  }
  return (
    <section>
      <DetailTitle title="Colors" />
      <motion.ul className="flex" animate={{ gap: '10px' }} transition={{ duration: 1, delay: 1 }}>
        {colors.map(({ red, green, blue }, i) => {
          return <Color r={red} g={green} b={blue} key={i} index={i} setColor={setColor} />
        })}
        <NewColor func={newColor} />
      </motion.ul>
    </section>
  )
}

export default LampColor
