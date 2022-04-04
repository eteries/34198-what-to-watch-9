import { useEffect, useState } from 'react';

import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmTabs from '../film-tabs/film-tabs';
import ReviewList from '../review-list/review-list';

import { FilmTab } from '../../constants';
import { useAppSelector } from '../../hooks';
import { Film } from '../../types/film';

type FilmDescriptionProps = {
  film: Film;
}

function FilmDescription({film}: FilmDescriptionProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(FilmTab.Overview);
  const {reviews} = useAppSelector((state) => state);
  const tabs = Object.keys(FilmTab);

  useEffect(() => {
    setActiveTab(FilmTab.Overview);
  }, [film]);

  return (
    <div className="film-card__desc">
      <FilmTabs tabs={tabs} activeTab={activeTab} onChange={(tab: string) => setActiveTab(tab)} />

      {activeTab === FilmTab.Overview && <FilmOverview film={film} reviewsNum={reviews.length} />}
      {activeTab === FilmTab.Details && <FilmDetails film={film} />}
      {activeTab === FilmTab.Reviews && <ReviewList reviews={reviews} />}
    </div>
  );
}

export default FilmDescription;
