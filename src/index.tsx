import jwt_decode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as actions from './redux/actions/userActions';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas/index';
import setAuthorizationHeader from './utils/axiosHeader';

import Footer from './components/Common/Footer/Footer';
import NavBar from './components/Common/NavBar/NavBar';
import NotFound from './components/Common/NotFound/NotFound';
import RequireAuth from './components/Common/Routes/RequireAuth';
import Home from './components/HomePage/HomePage';
import Catalogue from './containers/Catalogue';
import ChangePassword from './containers/ChangePassword';
import EmailConfirmation from './containers/EmailConfirmation';
import Signin from './containers/Signin';
import Signup from './containers/Signup';

import 'index.less';

const App = () => {
  if (localStorage.jwt) {
    const payload = jwt_decode(localStorage.jwt);
    setAuthorizationHeader(localStorage.jwt);
    store.dispatch(actions.userLoggedIn(payload));
  }

  return (
    <div className="wrapper">
      <div className="page-content">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={RequireAuth(Home)} />
          <Route path="/catalog" component={RequireAuth(Catalogue)} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/restore" component={ChangePassword} />
          <Route path="/confirmation" component={EmailConfirmation} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const composeEnhansers = composeWithDevTools || compose;
const store: Store<any> = createStore(
  rootReducer,
  initialState,
  composeEnhansers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
