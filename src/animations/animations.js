import { config } from "@react-spring/web";

export const transitions = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  delay: 0,
  config: { duration: 200 },
};

export const transitionsExpand = {
  from: {
    opacity: 0.5,
    transform: "translateY(-50%) scaleY(0.85) scaleX(1)",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) scaleY(1) scaleX(1)",
  },
  leave: {
    opacity: 0.5,
    transform: "translateY(-50%) scaleY(0.85) scaleX(1)",
  },
  delay: 0,
  config: config.molasses,
  config: { duration: 300 },
};

export const transitionsCompressed = {
  from: {
    opacity: 0.5,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) translateX(0%) scaleY(1) scaleX(1)",
  },
  leave: {
    opacity: 0.5,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
  },
  delay: 0,
  config: { duration: 300 },
};

export const transitionsDelete = {
  from: {
    opacity: 0.35,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) translateX(0%) scaleY(1) scaleX(1)",
  },
  leave: {
    opacity: 0.35,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
  },
  delay: 0,
  config: { duration: 400 },
};
