import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const WifiIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".wave-1",
        { opacity: [0.3, 1], y: -2 },
        { duration: 0.3, ease: "easeOut" },
      );
      animate(
        ".wave-2",
        { opacity: [0.3, 1], y: -2 },
        { duration: 0.3, ease: "easeOut", delay: 0.1 },
      );
      animate(
        ".wave-3",
        { opacity: [0.3, 1], y: -2 },
        { duration: 0.3, ease: "easeOut", delay: 0.2 },
      );
    };

    const stop = () => {
      animate(".wave-1", { opacity: 1, y: 0 }, { duration: 0.2 });
      animate(".wave-2", { opacity: 1, y: 0 }, { duration: 0.2 });
      animate(".wave-3", { opacity: 1, y: 0 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
      >
        {/* Wifi waves from Lucide "wifi" icon */}
        <motion.path className="wave-3" d="M5 13a10 10 0 0 1 14 0" />
        <motion.path className="wave-2" d="M8.5 16.5a5 5 0 0 1 7 0" />
        <motion.path className="wave-1" d="M2 8.82a15 15 0 0 1 20 0" />
        <line x1="12" x2="12.01" y1="20" y2="20" />
      </motion.svg>
    );
  },
);

WifiIcon.displayName = "WifiIcon";

export default WifiIcon;
