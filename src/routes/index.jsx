import React, { PropTypes } from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import NotFound from '../components/notFound';
import App from '../components/';
import Home from '../components/home';
import Statistical from '../components/statistical';

function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/index" component={Home} />
        <Route path="statistical" component={Statistical} />
        <IndexRoute component={Home} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}
Routes.propTypes = {
  history: PropTypes.any // eslint-disable-line
};
export default Routes;
