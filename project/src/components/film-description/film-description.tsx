import { useEffect, useState } from 'react';

import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmTabs from '../film-tabs/film-tabs';
import ReviewList from '../review-list/review-list';

import { FilmTabs as FilmTabsList } from '../../constants';
import { useAppSelector } from '../../hooks';
import { Film } from '../../types/film';

type FilmDescriptionProps = {
  film: Film;
}

function FilmDescription({film}: FilmDescriptionProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(FilmTabsList.Overview);
  const {reviews} = useAppSelector((state) => state);
  const tabs = Object.keys(FilmTabsList);

  useEffect(() => {
    setActiveTab(FilmTabsList.Overview);
  }, [film]);

  return (
    <div className="film-card__desc">
      <FilmTabs tabs={tabs} activeTab={activeTab} onChange={(tab: string) => setActiveTab(tab)} />

      {activeTab === FilmTabsList.Overview && <FilmOverview film={film} reviewsNum={reviews.length} />}
      {activeTab === FilmTabsList.Details && <FilmDetails film={film} />}
      {activeTab === FilmTabsList.Reviews && <ReviewList reviews={reviews} />}
    </div>
  );
}

export default FilmDescription;
