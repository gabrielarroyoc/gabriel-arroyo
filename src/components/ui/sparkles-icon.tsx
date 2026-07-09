import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SparklesIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".sparkle-big",
        { scale: 1.15, rotate: 15 },
        { duration: 0.35, ease: "easeOut" },
      );
      animate(
        ".sparkle-small-1",
        { scale: 1.3, opacity: 0.6 },
        { duration: 0.3, ease: "easeOut", delay: 0.05 },
      );
      animate(
        ".sparkle-small-2",
        { scale: 1.3, opacity: 0.6 },
        { duration: 0.3, ease: "easeOut", delay: 0.1 },
      );
    };

    const stop = () => {
      animate(
        ".sparkle-big",
        { scale: 1, rotate: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".sparkle-small-1",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".sparkle-small-2",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
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
        {/* Sparkles icon from Lucide — represents clean/quality code */}
        <motion.path
          className="sparkle-big"
          style={{ transformOrigin: "10px 12px" }}
          d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
        />
        <motion.path
          className="sparkle-small-1"
          style={{ transformOrigin: "20px 4px" }}
          d="M20 3v4"
        />
        <motion.path
          className="sparkle-small-2"
          style={{ transformOrigin: "20px 5px" }}
          d="M22 5h-4"
        />
      </motion.svg>
    );
  },
);

SparklesIcon.displayName = "SparklesIcon";

export default SparklesIcon;
