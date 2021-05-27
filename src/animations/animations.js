import { config } from "@react-spring/web";

export const transitions = {
  // default: { immediate: true },
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  // reverse: show,
  delay: 0,
  // config: config.molasses,
  config: { duration: 200 },
  // onStart: () => set(!show),
  // onChange: () => set(!show),
  // onStart: () => setShowEditItem(true),
};

export const transitionsExpand = {
  // default: { immediate: true },
  // transformOrigin: "top",
  from: {
    opacity: 0.5,
    transform: "translateY(-50%) scaleY(0.85) scaleX(1)",
    // maxHeight: "0px",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) scaleY(1) scaleX(1)",
    // maxHeight: "1000px",
  },
  leave: {
    opacity: 0.5,
    transform: "translateY(-50%) scaleY(0.85) scaleX(1)",
    // maxHeight: "0px",
  },
  // reverse: show,
  delay: 0,
  config: config.molasses,
  // config: config.gentle,
  config: { duration: 300 },
  // onStart: () => set(!show),
  // onChange: () => set(!show),
  // onStart: () => setShowEditItem(true),
  // onChange: () => setShowAddToStore(true),
  //   onDestroyed: () => setShowAddToStore((showAddToStore) => !showAddToStore),
};

export const transitionsCompressed = {
  // default: { immediate: true },
  from: {
    opacity: 0.5,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
    // maxHeight: "0px",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) translateX(0%) scaleY(1) scaleX(1)",
    // maxHeight: "1000px",
  },
  leave: {
    opacity: 0.5,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
    // maxHeight: "0px",
  },
  // reverse: show,
  delay: 0,
  // config: config.molasses,
  config: { duration: 300 },
  // onStart: () => set(!show),
  // onChange: () => set(!show),
  // onStart: () => setShowEditItem(true),
};

export const transitionsDelete = {
  // default: { immediate: true },
  from: {
    opacity: 0.35,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
    // maxHeight: "0px",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0%) translateX(0%) scaleY(1) scaleX(1)",
    // maxHeight: "1000px",
  },
  leave: {
    opacity: 0.35,
    transform: "translateY(70%) translateX(0%) scaleY(0.65) scaleX(1)",
    // maxHeight: "0px",
  },
  // reverse: show,
  delay: 0,
  // config: config.molasses,
  config: { duration: 400 },
  // onStart: () => set(!show),
  // onChange: () => set(!show),
  // onStart: () => setShowEditItem(true),
};
