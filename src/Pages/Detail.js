import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Intensity from '../Components/Intensity'
import Switch from '../Components/Switch'
import ColorPicker from '../Templates/ColorPicker'
import Scenes from '../Templates/Scenes'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { useContext } from 'react'

//import States
import { StateContext } from '../Hooks/StateContext'

const fadeVariants = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
}

const Detail = () => {
  const { pathname } = useLocation()
  const id = pathname.replace('/', '')
  const { rooms, setRooms } = useContext(StateContext)
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
        setRooms(res.data)
      })
  }, [])

  return (
    <motion.div
      variants={fadeVariants}
      animate="shown"
      initial="hidden"
      exit="exit"
      className="flex flex-col justify-between h-full pb-12 relative"
    >
      <Switch />
      <Intensity />
      <ColorPicker />
      <Scenes />
    </motion.div>
  )
}

export default Detail
