import { useState, useCallback } from 'react';

function useToggle(initialShown = false) {
  const [toggled, setToggle] = useState(initialShown);
  const turnOn = useCallback(() => setToggle(true), []);
  const turnOff = useCallback(() => setToggle(false), []);
  const toggle = useCallback(() => setToggle((state) => !state), []);

  return {
    toggled,
    turnOn,
    turnOff,
    toggle,
  };
}

export default useToggle;
