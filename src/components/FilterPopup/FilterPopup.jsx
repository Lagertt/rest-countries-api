import React from 'react';
import cs from './FilterPopup.module.scss';

function FilterPopup({ items, defaultItem, onChange, value }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const filterRef = React.useRef();
  const activeLabel = activeItem !== null ? items[activeItem] : defaultItem;

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const onSelectItem = (index) => {
    setActiveItem(index);
    setVisiblePopup(false);
  };

  const hadleOutsideClick = (event) => {
    if (!event.composedPath().includes(filterRef.current)) setVisiblePopup(false);
  };

  React.useEffect(() => {
    document.body.addEventListener('click', hadleOutsideClick);
  }, []);

  React.useEffect(() => {
    value = items[activeItem];
    onChange(value);
  }, [activeItem]);

  return (
    <div ref={filterRef} className={cs.filter}>
      <div className={cs.title} onClick={toggleVisiblePopup}>
        <span>{activeLabel}</span>

        <svg
          className={visiblePopup ? `${cs.rotated}` : ''}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </div>
      {visiblePopup && (
        <div className={cs.popup}>
          <ul>
            {items &&
              items.map((item, index) => (
                <li
                  className={activeItem === index ? `${cs.active}` : ''}
                  onClick={() => onSelectItem(index)}
                  key={`${item}_${index}`}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterPopup;
