import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSortBy,
  setFilter,
  setSearchQuery,
  selectTitles,
  fetchFeed,
} from './slice';
import { PageLayout } from 'components/PageLayout';
import classNames from 'classnames';

export const HomePage = () => {
  const entries = useSelector(selectTitles);
  const dispatch = useDispatch();

  const searchInputRef = useRef(null);
  const [ searchInputValue, setSearchInputValue ] = useState('');
  const [ sortByValue, setSortByValue ] = useState('year_desc');
  const [ filterValue, setFilterValue ] = useState('movie');

  useEffect(() => {
    dispatch(setSearchQuery(searchInputValue));
  }, [dispatch, searchInputValue]);

  useEffect(() => {
    dispatch(setSortBy(sortByValue));
  }, [dispatch, sortByValue]);

  useEffect(() => {
    dispatch(setFilter(filterValue));
  }, [dispatch, filterValue])

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, [searchInputRef]);

  return (
    <PageLayout
      renderHeader={() => <>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <div className="mt-1 flex rounded-md shadow-sm">
              <input 
                type="search" 
                name="search" 
                id="search_input"
                className="appearance-none px-3 py-2 focus:ring-gray-500 focus:border-gray-500 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 placeholder-gray-500 text-gray-900" 
                placeholder="Search..."
                ref={searchInputRef}
                value={searchInputValue}
                onChange={e => setSearchInputValue(e.target.value)}
              />
              <button className="mx-3 px-4 py-1 text-sm text-gray-600 rounded-full border border-gray-200 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <div className="mt-1 flex rounded-md shadow-sm">
              <label htmlFor="sortby" className="sr-only">Sort by</label>
              <select 
                id="sortby" 
                name="sortby" 
                className="outline-none mx-3 px-4 py-2 text-sm rounded-full flex-1 block border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-full"
                value={sortByValue}
                onChange={e => setSortByValue(e.target.value)}
              >
                <option value="year_desc">Year Descending</option>
                <option value="year_asc">Year Ascending</option>
                <option value="title_asc">Title Ascending</option>
                <option value="title_desc">Title Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-4">
          <button className={classNames(
            "px-8 py-1 text-sm rounded-full border border-gray-200 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2",
            { "bg-gray-500 text-white": filterValue === "movie" },
            { "text-gray-600": filterValue !== "movie" },
          )}
            onClick={() => setFilterValue("movie")}
          >
            Movies
          </button>
          <button className={classNames(
            "mx-4 px-8 py-1 text-sm rounded-full border border-gray-200 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2",
            { "bg-gray-500 text-white": filterValue === "series" },
            { "text-gray-600": filterValue !== "series" },
          )}
            onClick={() => setFilterValue("series")}
          >
            Series
          </button>
        </div>
      </>}
    >
      <div className="grid grid-cols-5 gap-6">
        {entries && entries.length
        ? entries.map((item, ix) => <div key={ix} className="col-span-1 hover:ring-gray-500">
          <div className="overflow-hidden">
            {item.images && <img className="object-contain w-full h-48" src={item.images['Poster Art'].url} />}
          </div>
          <div className="text-sm text-center">{item.title}{item.releaseYear ? ` (${item.releaseYear})` : ''}</div>
        </div>)
        : <div className="text-sm text-center col-span-5">No results found</div>}
      </div>
    </PageLayout>
  );
}

export default HomePage;
