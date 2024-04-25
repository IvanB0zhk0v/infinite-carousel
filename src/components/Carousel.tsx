import React, { useRef, useState, useMemo, useLayoutEffect } from "react";
import "./styles.css";

export interface CarouselProps {
  rowHeight: number;
  children: Array<JSX.Element>;
}

const Carousel: React.FC<CarouselProps> = ({ rowHeight, children}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [height, setHeight] = useState(0);
  const totalHeight = children.length * rowHeight;

  // Handle resizing to update height
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef.current?.offsetHeight]);

  // Calculate visible children and wrap around the content
  const visibleChildren = useMemo(() => {
    let startIndex = Math.floor(scrollPosition / rowHeight) % children.length;
    let endIndex = Math.ceil((scrollPosition + height) / rowHeight) % children.length;
    let items = [];

    if (startIndex <= endIndex) {
      items = children.slice(startIndex, endIndex + 1);
    } else {
      // Wrap around the array end to start
      items = [...children.slice(startIndex, children.length), ...children.slice(0, endIndex + 1)];
    }

    // Adjust styles for positioning
    return items.map((child, index) => React.cloneElement(child, {
      style: {
        position: "absolute",
        top: `${(startIndex + index) * rowHeight}px`,
        height: `${rowHeight}px`,
        left: 0,
        right: 0,
        lineHeight: `${rowHeight}px`,
      }
    }));
  }, [scrollPosition, height, children, rowHeight]);

  // Infinite scroll logic
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    let newScrollPosition = e.currentTarget.scrollTop;
    // Reset scroll position when exceeding buffer
    if (newScrollPosition < rowHeight || newScrollPosition > totalHeight - height) {
      newScrollPosition = totalHeight;
      containerRef.current!.scrollTop = newScrollPosition;
    }
    setScrollPosition(newScrollPosition);
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {visibleChildren}
    </div>
  );
};

export default Carousel;