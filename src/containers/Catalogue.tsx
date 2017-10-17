import { connect, Dispatch } from 'react-redux';
import Catalogue from '../components/Catalogue/Catalogue';
import * as carFiltersActions from '../redux/actions/carFiltersActions';
import * as formStateActions from '../redux/actions/formStateActions';
import { InitialState } from '../redux/models/userModel';

interface PropsInterface {
  handleClearError: () => void;
  handleClearFilters: () => void;
  handleFetchMarksValues: () => void;
  handleFetchModelsValues: (mark: string) => void;
  handleFetchBodyTypesValues: () => void;
  handleSetCurrentFilter: (payload: any) => void;
  handeSetSortingParams: (payload: any) => void;
}

interface StateInterface {
  searchError: any;
  loading: boolean;
  language: string;
  carFilters: {
    filterValues: any;
    currentFilter: any;
    sortingParams: any;
  };
}

const mapStateToProps = (state: any) => ({
  loading: state.formState.loading,
  searchError: state.formState.searchError,
  language: state.user.interfaceLanguage,
  carFilters: state.carFilters
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleClearError: () => dispatch(formStateActions.setSearchError('')),
  handleClearFilters: () => dispatch(carFiltersActions.clearFilters()),
  handleFetchMarksValues: () => dispatch(carFiltersActions.fetchMarksValues()),
  handleFetchBodyTypesValues: () => dispatch(carFiltersActions.fetchBodyTypesValues()),
  handleFetchModelsValues: (mark: string) => dispatch(carFiltersActions.fetchModelsValues(mark)),
  handleSetCurrentFilter: (payload: any) => dispatch(carFiltersActions.setCurrentFilter(payload)),
  handeSetSortingParams: (payload: any) => dispatch(carFiltersActions.setSortingParams(payload))
});

export default connect<StateInterface, PropsInterface>(mapStateToProps, mapDispatchToProps)(
  Catalogue
);
