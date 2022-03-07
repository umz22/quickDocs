import React from 'react'
import { motion } from 'framer-motion';

// styles
import './AddBtn.css'

export default function AddBtn({ clickHandle }) {
  return (
    <motion.div
      className='add-btn'
      onClick={clickHandle}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
    </motion.div>
  )
}
