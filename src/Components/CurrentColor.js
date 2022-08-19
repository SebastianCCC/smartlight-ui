import { useContext, useState, useEffect } from 'react'
import { LampContext } from '../Utility/LampContext'
import { motion } from 'framer-motion'
import ColorConverter from 'cie-rgb-color-converter'

const Color = ({ color, r, g, b, setColor, index }) => {
  let xy = ColorConverter.rgbToXy(r, g, b)
  const { setLampColor } = useContext(LampContext)
  const [crntColor, setCrntColor] = useState(null)
  const value = parseInt(`-${(10 * index) / 2}`)
  useEffect(() => {
    setCrntColor(color)
  }, [color])

  return (
    <motion.li
      initial={{ x: value }}
      animate={{ x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="w-7 h-7 rounded-full cursor-pointer shadow-sm"
      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
      onClick={() => {
        setLampColor(crntColor)
        setColor(xy)
      }}
    ></motion.li>
  )
}

export default Color
