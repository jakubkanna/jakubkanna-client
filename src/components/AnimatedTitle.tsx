import React, { useState, useEffect, useRef } from "react";
import { AnimatedTitle } from "../utils/titleAnimation";

interface AnimatedTitleProps {
  title: string;
}

const Title: React.FC<AnimatedTitleProps> = ({ title }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const animatedTitleRef = useRef<AnimatedTitle | null>(null);

  useEffect(() => {
    if (!animatedTitleRef.current) {
      animatedTitleRef.current = new AnimatedTitle(setDisplayedTitle);
    }
    animatedTitleRef.current.animate(title);
  }, [title]);

  return <>{displayedTitle}</>;
};

export default Title;
