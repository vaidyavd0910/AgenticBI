// src/components/NavigationGuard.jsx
import { useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useContext } from "react";

export function NavigationGuard({ when, onConfirm }) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    navigator.push = (...args) => {
      const [path] = args;
      const allow = window.confirm("⚠️ You haven’t saved the data.\n\nPress OK to Delete & Continue OR Cancel to Save & Stay.");
      if (allow) {
        onConfirm?.(); // delete case
        push.apply(navigator, args);
      }
      // else: save case (do nothing, stay on same page)
    };

    return () => {
      navigator.push = push;
    };
  }, [when, navigator, onConfirm]);

  return null;
}
