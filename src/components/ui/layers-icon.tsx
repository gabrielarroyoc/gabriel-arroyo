import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LayersIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".layer-top",
        { y: -3 },
        { duration: 0.3, ease: "easeOut" },
      );
      animate(
        ".layer-bottom",
        { y: 3 },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".layer-top", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
      animate(".layer-bottom", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
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
        {/* Layers icon from Lucide */}
        <motion.path className="layer-top" d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <motion.path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <motion.path className="layer-bottom" d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </motion.svg>
    );
  },
);

LayersIcon.displayName = "LayersIcon";

export default LayersIcon;
