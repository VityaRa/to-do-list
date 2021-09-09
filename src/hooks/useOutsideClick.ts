//@ts-nocheck
import { useEffect, useCallback, useRef } from "react";
export const useOutsideClick = (onClick: any) => {
  const ref = useRef(null);

  const handleClick = useCallback(
    e => {
      
      const inside = ref.current.contains(e.target);
      if (inside) return;

      onClick();
    },
    [onClick, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return ref;
};

