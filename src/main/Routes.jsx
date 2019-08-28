import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import NewGenre from '../components/genre/NewGenre'
import Genres from '../components/genre/Genres'
import NewSeries from '../components/series/NewSeries'
import Series from '../components/series/Series'
import EditSeries from '../components/series/EditSeries'


export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route exact path='/series/:genre' component={Series} />
        <Route exact path='/series/edit/:id' component={EditSeries} />
        
        <Route exact path='/new' component={NewSeries} />

        <Route exact path='/Genres' component={Genres} />
        <Route exact path='/newGenre' component={NewGenre} />
        <Redirect from='*' to='/' />
        
          

    </Switch>