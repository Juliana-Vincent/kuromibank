"use client"
import React, { useState, useRef, useEffect } from 'react';
import './style.css';

interface AccordionItem {
  title: string;
  content: string;
}

interface Props {
  items: AccordionItem[];
}

const Accordion: React.FC<Props> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.maxHeight =
          activeIndex === i ? `${ref.scrollHeight}px` : '0px';
      }
    });
  }, [activeIndex]);

  return (
    <div className="accordion max-w-150 w-full">
      {items.map((item, i) => (
        <div className="accordion-item" key={i}>
          <div
            className={`accordion-item-header ${activeIndex === i ? 'active-accordion' : ''}`}
            onClick={() => toggle(i)}
          >
            {item.title}
          </div>
          <div
            className="accordion-item-body"
            ref={(el) => {contentRefs.current[i] = el;}}>
            <div className="accordion-item-content">{item.content}</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Accordion;
