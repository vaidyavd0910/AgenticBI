// src/components/NavigationGuard.jsx
import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function NavigationGuard({ when, isSessionSaved, onConfirm }) {
  const navigator = useContext(NavigationContext).navigator;

  useEffect(() => {
    if (!when || isSessionSaved) return; // ✅ block only when not saved

    const push = navigator.push;
    navigator.push = (...args) => {
      const [path] = args;
      const allow = window.confirm(
        "⚠️ You haven’t saved the session.\n\nPress OK to Delete & Continue OR Cancel to Save & Stay."
      );
      if (allow) {
        onConfirm?.(); // delete = clear data
        push.apply(navigator, args);
      }
      // else: stay on same page
    };

    return () => {
      navigator.push = push;
    };
  }, [when, isSessionSaved, navigator, onConfirm]);

  return null;
}
