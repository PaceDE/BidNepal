import { motion } from "motion/react";
import Logo from '@/shared/components/ui/atoms/Logo';

const Loading = () => {
    return (
        <motion.div
            key="loader"
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [1, 0.85, 1],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Logo style="text-5xl! sm:6xl! md:text-8xl!" />
            </motion.div>
        </motion.div>
    )
}

export default Loading
