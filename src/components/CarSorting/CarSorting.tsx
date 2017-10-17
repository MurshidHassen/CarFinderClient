import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import * as React from 'react';
import SelectInput from '../Common/FormInputs/SelectInput';
import './style.less';

export interface Props {
  sortingParams: {
    limit: number;
    skip: number;
    sort: string;
  };
  handeSetSortingParams: (payload: any) => void;
}

export interface State {
  limit: number;
  skip: number;
  sortField: string;
  sort: string;
  limitValues: any[];
  sortValues: any[];
}

class CarSorting extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      limit: 20,
      skip: 0,
      sortField: 'price',
      sort: 'Lowest',
      limitValues: [
        {
          id: 1,
          name: 20
        },
        {
          id: 2,
          name: 30
        },
        {
          id: 3,
          name: 50
        }
      ],
      sortValues: [
        {
          id: 1,
          name: 'Highest'
        },
        {
          id: 2,
          name: 'Lowest'
        }
      ]
    };
  }

  public onChange = (name: string) => (e: any) => {
    this.setState({
      ...this.state,
      [name]: e.target.value
    });
  };

  public onSubmit = (e: any) => {
    e.preventDefault();
    // handle submit logic here
  };

  public componentDidMount() {
    this.props.handeSetSortingParams({
      limit: this.state.limit,
      sort: this.state.sort
    });
  }
  public render() {
    const { limit, sort, limitValues, sortValues } = this.state;
    return (
      <Paper className="car-sorting-form">
        <form className="sorting-form">
          <SelectInput
            field="limit"
            label="Ads per page"
            value={limit}
            options={limitValues}
            onChange={this.onChange}
          />
          <SelectInput
            field="sort"
            label="Price"
            value={sort}
            options={sortValues}
            onChange={this.onChange}
          />
        </form>
      </Paper>
    );
  }
}

export default CarSorting;
