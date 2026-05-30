import { m } from "motion/react";
import Logo from '@/shared/components/ui/atoms/Logo/Logo.component';

const Loading = () => {
    return (
        <m.div
            key="loader"
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <m.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [1, 0.85, 1],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="animated-element"
            >
                <Logo style="text-5xl! sm:6xl! md:text-8xl!" />
            </m.div>
        </m.div>
    )
}

export default Loading
