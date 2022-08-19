import { ReactComponent as ArrowIcon } from '../assets/svg/arrow.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PageTitle = ({ title }) => {
  return (
    <motion.h1 className="text-3xl text-white">
      <Link to="/">
        <ArrowIcon className="inline" /> {title}
      </Link>
    </motion.h1>
  )
}

export default PageTitle
