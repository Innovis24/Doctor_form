import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle back button click
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(1); // Move forward in history, to prevent going back
    };

    // Push a state into history to create an additional history entry
    window.history.pushState(null, null, window.location.href);

    // Listen for the popstate event to catch any back navigation attempt
    window.addEventListener("popstate", handleBackButton);

    // Cleanup when the component is unmounted
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return null;
};

export default PreventBackNavigation;
