import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'dva/router';
import NotFound from '../components/notFound';
import App from '../components/';
import Home from '../components/home';
import Login from '../login/';
import Statistical from '../components/statistical';

function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Redirect from="/" to="/:id/app/" />
      <Route path="/:id/app/" component={App}>
        <Route path="/:id/app/index" component={Home} />
        <Route path="/:id/app/statistical" component={Statistical} />
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
