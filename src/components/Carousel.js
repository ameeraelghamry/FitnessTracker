import React, { useEffect, useMemo, useState } from 'react';
import './Carousel.css';

import leftArrow from '../assets/icons/left-arrow.png';
import rightArrow from '../assets/icons/right-arrow.png';
import gymIcon from '../assets/icons/gym.png';
import targetIcon from '../assets/icons/target.png';
import bodyPartIcon from '../assets/icons/body-part.png';
import equipmentIcon from '../assets/icons/equipment.png';

const ITEMS_PER_SCROLL = 4;
const NUM_SCROLLS = 2; // total 2 pages (4 items each)

function buildDefaultItems() {
  const icons = [gymIcon, targetIcon, bodyPartIcon, equipmentIcon];
  const labels = ['Gym', 'Target', 'Body Part', 'Equipment'];
  const items = [];
  for (let i = 0; i < ITEMS_PER_SCROLL * NUM_SCROLLS; i += 1) {
    const idx = i % icons.length;
    items.push({ id: `item-${i + 1}`, title: `${labels[idx]} ${i + 1}`, image: icons[idx] });
  }
  return items;
}

export default function Carousel({ items: itemsProp }) {
  const items = useMemo(() => (itemsProp && itemsProp.length ? itemsProp : buildDefaultItems()), [itemsProp]);

  // Ensure we only show two pages of four items each, repeating if needed
  const normalized = useMemo(() => {
    const needed = ITEMS_PER_SCROLL * NUM_SCROLLS;
    if (items.length === needed) return items;
    const out = [];
    for (let i = 0; i < needed; i += 1) out.push(items[i % items.length]);
    return out;
  }, [items]);

  const pages = useMemo(() => {
    return [
      normalized.slice(0, ITEMS_PER_SCROLL),
      normalized.slice(ITEMS_PER_SCROLL, ITEMS_PER_SCROLL * 2),
    ];
  }, [normalized]);

  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % NUM_SCROLLS);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setPageIndex((prev) => (prev - 1 + NUM_SCROLLS) % NUM_SCROLLS);
  const goNext = () => setPageIndex((prev) => (prev + 1) % NUM_SCROLLS);

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {pages.map((page, idx) => (
            <div key={`page-${idx}`} className="carousel-page">
              {page.map((item) => (
                <div key={item.id} className="carousel-card">
                  <img src={item.image} alt={item.title} />
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" className="carousel-arrow" aria-label="Previous" onClick={goPrev}>
          <img src={leftArrow} alt="left" />
        </button>
        <button type="button" className="carousel-arrow" aria-label="Next" onClick={goNext}>
          <img src={rightArrow} alt="right" />
        </button>
      </div>
    </div>
  );
}
