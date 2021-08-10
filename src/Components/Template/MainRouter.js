import React from 'react'
import CandidatsComponent from '../Candidats/CandidatsComponent'

import {
    BrowserRouter as 
    Switch,
    Route,
  } from "react-router-dom";
import HomeComponent from '../Home/HomeComponent';
import CalendarComponent from '../Calendar/CalendarComponent';
import VehiculesComponent from '../Vehicules/VehiculesComponent';
import UsersComponent from '../Users/UsersComponent';
import TeamComponent from '../Team/TeamComponent';
import TestComponent from '../Tests/TestComponent';
import CandCalendarComponent from '../Calendar/CandCalendarComponent';

  export default function MainRouter()
  {
     return (
          <Switch>
              <Route  exact path="/main/Home">
                  <HomeComponent/>
              </Route>
              <Route exact path="/main/Calendar">
                  <CalendarComponent/>
              </Route>
              <Route exact path="/main/Candidats">
                  <CandidatsComponent/>  
              </Route>
              <Route exact path="/main/Vehicules">
                  <VehiculesComponent/> 
              </Route>
              <Route exact path="/main/Users">
                  <UsersComponent/>
             </Route>
             <Route exact path="/main/Team">
                 <TeamComponent/>
             </Route>
             <Route exact path="/main/Test">
                 <TestComponent/>
             </Route>
             <Route exact path="/main/CandCalendar">
                 <CandCalendarComponent/>
             </Route>
          </Switch>
      );
  }