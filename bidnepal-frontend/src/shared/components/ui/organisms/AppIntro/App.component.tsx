"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import Logo from "../../atoms/Logo";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/login", "/register", "/verify-email"]

const AppIntro = () => {
    const pathname = usePathname();
    const [introExit, setIntroExit] = useState(()=>{
        return AUTH_ROUTES.some(route=> pathname.startsWith(route))
    });

    useEffect(() => {
        if(!introExit){
            const timer = setTimeout(() => {
                setIntroExit(true);
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [])
    return (
        <>
            <AnimatePresence mode="wait">
                {!introExit && (

                    <motion.div
                        key="test"
                        className="bg-primarybg absolute w-full h-full"
                    >
                            <motion.div
                                key="Intro"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ ease: "easeIn", duration: 0.3 }}
                                className="absolute top-1/2 w-full h-0.5 shadow-[5px_10px_10px_rgba(0,0,0,0.3)]"
                            >
                                <div className="relative bottom-15 md:bottom-30 flex flex-col justify-center items-center">
                                    {/* BALL */}
                                    <motion.div
                                        initial={{ y: -200, opacity: 1, scale: 1 }}
                                        animate={{ y: 0 }}
                                        transition={{ type: "spring", stiffness: 120 }}
                                        className="absolute"
                                    >
                                        <motion.div
                                            initial={{ opacity: 1, scale: 1 }}
                                            animate={{ opacity: 0, scale: 0 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                            className="w-20 h-20  rounded-full bg-theme"
                                        />
                                    </motion.div>

                                    <div className="flex items-center">

                                        {/* LOGO */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", delay: 0.1 }}
                                        >
                                            <Logo style="text-5xl! sm:6xl! md:text-8xl!" />
                                        </motion.div>

                                        {/* HAMMER */}
                                        <motion.div
                                            initial={{ opacity: 0, rotate: 45, x: 20 }}
                                            animate={{ opacity: 1, rotate: -15, x: 0 }}
                                            transition={{ type: "spring", delay: 0.75, duration: 1 }}
                                            className="relative right-7 md:right-15 bottom-7 md:bottom-10  w-20 md:w-35"
                                        >
                                            <img src="/hammer.png" alt="hammer" className="drop-shadow-lg" />
                                        </motion.div>
                                    </div>

                                </div>
                            </motion.div>
                  
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default AppIntro;