import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'current-input';

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';


const routes = (
  <Route path="/mokbnb-progress-site/" mapMenuTitle="Home" component={App}>
    <IndexRoute component={Home} />

    <Route path="/mokbnb-progress-site/example" mapMenuTitle="Example" component={ExampleComponent}>
      <Route path="/mokbnb-progress-site/two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
    </Route>

    <Route path="/mokbnb-progress-site/*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root')
);
