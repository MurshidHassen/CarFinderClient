import * as React from 'react';
import * as interfaces from '../../interfaces';
import { CarModel } from '../../redux/models/filterResultsModel';
import CarFilter from '../CarFilter/CarFilter';
import CarSorting from '../CarSorting/CarSorting';
import ScrollToTop from '../Common/ScrollToTop/ScrollToTop';
import FilterResults from '../FilterResults/FilterResults';

import './style.less';

export interface Props {
  handleClearError: () => void;
  handleClearFilters: () => void;
  handleFetchMarksValues: () => void;
  handleFetchBodyTypesValues: () => void;
  handleFetchModelsValues: (mark: string) => void;
  handleSetCurrentFilter: (payload: any, sortingParams: interfaces.SortingParams) => void;
  handeSetSortingParams: (payload: interfaces.SortingParams) => void;
  handleSetAdsAsLoaded: (payload: boolean) => void;
  handleUpdateAds: (payload: any, sortingParams: any) => void;
  handleSubmitSavedFilters: (payload: any) => void;
  handleShowAdPreview: (id: string) => void;
  clearFilterResults: () => void;
  handleCloseModal: () => void;

  history: {
    replace: (url: string) => void;
  };
  location: {
    search: any;
  };

  adsAreLoaded: boolean;
  successMessage: string;
  loading: boolean;
  selectedAd: string;
  searchError?: any;
  language: string;
  filterResults: CarModel[];
  carFilters: {
    filterValues: interfaces.FilterValues;
    currentFilter: interfaces.CarFilter;
    sortingParams: interfaces.SortingParams;
  };
}

interface State {
  skip: number;
  items: CarModel[];
}

class Catalogue extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      skip: 0,
      items: []
    };
  }

  public handleSetAds = (ads: CarModel[]) => {
    this.setState({
      items: ads
    });
  };

  public handleSetSkip = (skipAmount: number) => {
    this.setState({
      skip: skipAmount
    });
  };

  public render() {
    const {
      history,
      language,
      location,
      loading,
      successMessage,
      searchError,
      carFilters,
      handleClearError,
      handleClearFilters,
      handleSetCurrentFilter,
      handleFetchMarksValues,
      handleFetchBodyTypesValues,
      handleFetchModelsValues,
      handeSetSortingParams,
      handleSubmitSavedFilters,
      handleShowAdPreview,
      clearFilterResults,
      filterResults,
      adsAreLoaded,
      handleSetAdsAsLoaded,
      selectedAd,
      handleCloseModal
    } = this.props;

    return (
      <div>
        <CarFilter
          location={location}
          history={history}
          language={language}
          carFilters={carFilters}
          searchError={searchError}
          loading={loading}
          successMessage={successMessage}
          handleSetSkip={this.handleSetSkip}
          handleSetAds={this.handleSetAds}
          handleClearError={handleClearError}
          handleClearFilters={handleClearFilters}
          handleFetchMarksValues={handleFetchMarksValues}
          handleFetchModelsValues={handleFetchModelsValues}
          handleSetCurrentFilter={handleSetCurrentFilter}
          handleFetchBodyTypesValues={handleFetchBodyTypesValues}
          handleSetAdsAsLoaded={handleSetAdsAsLoaded}
          handleSubmitSavedFilters={handleSubmitSavedFilters}
          clearFilterResults={clearFilterResults}
        />
        <CarSorting
          language={language}
          sortingParams={carFilters.sortingParams}
          handeSetSortingParams={handeSetSortingParams}
        />
        <FilterResults
          language={language}
          filterResults={filterResults}
          items={this.state.items}
          skip={this.state.skip}
          loading={loading}
          carFilters={carFilters}
          selectedAd={selectedAd}
          adsAreLoaded={adsAreLoaded}
          handleSetAds={this.handleSetAds}
          handleSetCurrentFilter={handleSetCurrentFilter}
          handleSetSkip={this.handleSetSkip}
          handeSetSortingParams={handeSetSortingParams}
          handleShowAdPreview={handleShowAdPreview}
          handleCloseModal={handleCloseModal}
        />
        <ScrollToTop scrollStepInPx={50} delayInMs={10} />
      </div>
    );
  }
}

export default Catalogue;
