import { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion"
import { MenuToggle } from "./MenuToggle";

// styles
import styles from './Sidebar.module.css'

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 70px 50px)`, 
        transition: {
            type: "spring",
            stiffness: 30,
            restDelta: 5,
        }
    }),
    closed: {
        clipPath: "circle(30px at 70px 50px)",
        transition: {
            delay: 0.01,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const naviVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.6 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {
    open: {
        y: 50,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
            delay: 4
        }


    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};


export const Sidebar = ({ filterHandle, filterBtn, sideBarData, sidebarPlaceholder }) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [showSidebar, setShowSidebar] = useCycle(false, true)
    const uniqueFilters = [...new Set(filterBtn.map(fil => fil.folder))]

    console.log(uniqueFilters)

    const clickHandle = () => {
        setShowSidebar()
    }

    
    return (
        <div>
            
            <motion.nav
                onClick={clickHandle}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className={styles['sidebar']}
                >

                <motion.div 
                    onClick={toggleOpen} 
                    className={styles['background']} 
                    variants={sidebar} />
                {showSidebar && 
                <motion.div
                    variants={naviVariants}
                    className={styles['sidebarNav']}
                    >
                        
                    <motion.div onClick={toggleOpen}>
                        <motion.div animate={{ x: 20 }} transition={{ type: "spring" }} className={styles['text-placeholder']}>
                            {sidebarPlaceholder}
                        </motion.div>


                        {sideBarData && <motion.div
                            variants={itemVariants}
                            className={styles['docs-text-placeholder']}
                            onClick={(e) => filterHandle('')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}>
                            <motion.div>All</motion.div>
                        </motion.div>
                        }

                        {uniqueFilters.map((filters) => (
                            
                            <motion.div
                                variants={itemVariants}
                                className={styles['docs-text-placeholder']}
                                onClick={(e) => filterHandle(filters)}
                                key={filters}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <motion.div>{filters}</motion.div>
                            </motion.div>
                        ))}


                            </motion.div>
                </motion.div>
}
                    <MenuToggle toggle={toggleOpen} />
                </motion.nav>
            
        </div>

    )
}
