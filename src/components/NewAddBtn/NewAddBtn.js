import React from 'react'
import {motion, useCycle} from 'framer-motion'

// styles
import './NewAddBtn.css'

export default function NewAddBtn() {


    const addSideBar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 120px)`,
            transition: {
                type: "spring",
                stiffness: 30,
                restDelta: 5,
            }
        }),
        closed: {
            clipPath: "circle(30px at 40px 120px)",
            transition: {
                delay: 0.01,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    const [isOpen, toggleOpen] = useCycle(false, true);
    const [showSidebar, setShowSidebar] = useCycle(false, true)

  return (
    <div>
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="addSideBar-nav"
        >
            <motion.div
                variants={addSideBar}
                className='background'
            >

            </motion.div>
            {/* <AddBtnToggle toggle={() => toggleOpen()} /> */}
        </motion.nav>
    </div>
  )
}
