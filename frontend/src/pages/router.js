import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

// Pages
import Home from './home'

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </Router>
)

export default AppRouter