import React from 'react'
import { motion, MotionValue } from "motion/react";

const ProfileImageContainer = ({ containerRef, zoom, setZoom, image, x, y }: { containerRef: React.RefObject<HTMLDivElement | null>, zoom: number, setZoom: React.Dispatch<React.SetStateAction<number>>, image: string, x: MotionValue<number>, y: MotionValue<number> }) => {
    return (
        <div className="py-12 px-6 ">
            <motion.div ref={containerRef} className="relative w-full h-50 overflow-hidden">
                {/* Base image */}
                <motion.img style={{
                    scale: zoom,
                }}
                    src={image} alt="Profile" className="w-full h-full object-contain" />

                {/* Overlay */}
                <motion.div className="absolute inset-0 " />


                {/* Actual image container */}
                <div
                    className="w-full h-full absolute inset-0 flex justify-center items-center">

                    <motion.div className={`cropped-image aspect-square h-full max-w-full max-h-full    border-4 border-theme`}
                        drag
                        style={{
                            boxShadow: "0 0 0 9999px rgba(0,0,0,0.6",
                            x, y
                        }}

                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={containerRef}
                    >

                        {/* Visible image */}
                        <motion.div className="w-full h-full rounded-full overflow-hidden"
                            style={{
                                boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                            }} />


                    </motion.div>

                </div>
            </motion.div>
            <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
            />

        </div>
    )
}

export default ProfileImageContainer
