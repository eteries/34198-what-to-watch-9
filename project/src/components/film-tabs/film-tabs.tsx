import { MouseEvent } from 'react';

type FilmTabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string)=> void;
}

function FilmTabs({tabs, activeTab, onChange}: FilmTabsProps): JSX.Element {
  const getTabClass = (current:string): string => (
    current === activeTab
      ? 'film-nav__item film-nav__item--active'
      : 'film-nav__item'
  );

  const handleOnTabClick = (evt: MouseEvent<HTMLAnchorElement>, tab: string) => {
    evt.preventDefault();
    onChange(tab);
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {tabs.map((tab) => (
          <li className={getTabClass(tab)} key={tab}>
            <a href="#"
              className="film-nav__link"
              onClick={(evt) => handleOnTabClick(evt, tab)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilmTabs;
