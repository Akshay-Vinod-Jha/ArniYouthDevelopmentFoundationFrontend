import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";

export const useNavigateWithDelay = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const navigateWithDelay = (path, delay = 500) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, delay);
  };

  return { navigateWithDelay, isLoading };
};

export const NavigationLink = ({
  to,
  children,
  className,
  onClick,
  delay = 300,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);

    setIsNavigating(true);
    setTimeout(() => {
      navigate(to);
      setIsNavigating(false);
    }, delay);
  };

  return (
    <>
      {isNavigating && <PageLoader />}
      <a href={to} onClick={handleClick} className={className}>
        {children}
      </a>
    </>
  );
};
