import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import { AragonApp } from '@aragon/ui'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'
import GuestView from './layouts/guests/Guest-View.js'
import EthMemphis from './layouts/EthMemphis-Reservations/EthMemphis-Reservations.js'
import HotelFrontDesk from './layouts/Hotel-Front-Desk/Hotel-Front-Desk.js'
import RinkebyControls from './layouts/Rinkeby-Controls/Rinkeby-Controls.js'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <AragonApp publicUrl="/">
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
            <Route path="profile" component={UserIsAuthenticated(Profile)} />
            <Route path="guest" component={GuestView}/>
            <Route path="ethmemphis" component={EthMemphis}/>
            <Route path="hotelfrontdesk" component={HotelFrontDesk}/>
            <Route path="rinkebycontrols" component={RinkebyControls}/>
          </Route>
        </AragonApp>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
