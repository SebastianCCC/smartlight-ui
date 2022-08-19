import { ReactComponent as BedIcon } from '../assets/svg/bed.svg'
import { ReactComponent as LivingRoomIcon } from '../assets/svg/living.svg'
import { ReactComponent as KitchenIcon } from '../assets/svg/kitchen.svg'
import { ReactComponent as BathIcon } from '../assets/svg/bathroom.svg'
import { ReactComponent as OutdoorIcon } from '../assets/svg/outdoor.svg'
import { ReactComponent as BalconyIcon } from '../assets/svg/balcony.svg'
import RoomLink from '../Components/RoomLink'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useState, useEffect } from 'react'

const fadeVariants = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
}

const Home = () => {
  const [groups, setGroups] = useState(null)
  useEffect(() => {
    axios
      .get(
        'http://' + process.env.REACT_APP_IP + '/api/' + process.env.REACT_APP_USERNAME + '/groups'
      )
      .then((res) => {
        setGroups(res.data)
      })
  }, [])
  return (
    <motion.div
      variants={fadeVariants}
      animate="shown"
      initial="hidden"
      className="flex flex-col gap-2 h-full overflow-x-auto"
    >
      <h2>All Rooms</h2>
      <nav>
        <ul className="flex flex-wrap justify-between gap-y-6 mb-6">
          {groups &&
            Object.values(groups).map((room, i) => {
              const { name, lights } = room
              const id = Object.keys(groups)[i]
              return <RoomLink key={i} room={name} lights={lights} id={id} />
            })}
        </ul>
      </nav>
    </motion.div>
  )
}

export default Home
