import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'

// works like a wrapper for the entire component

const MainRouter = () => (
    <div>
        <Switch>
            <Route path="/" component={Home}></Route>

        </Switch>
    </div>
)

export default MainRouter