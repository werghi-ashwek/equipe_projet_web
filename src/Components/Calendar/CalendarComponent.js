import React, { createRef } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Paper} from '@material-ui/core';
import PageHeader from '../PageHeader'
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';


//importi lena l resources w el events 

export default class DemoApp extends React.Component {
  render() {

    const calendarRef = createRef();
    



    return (
          
    <div>
        <PageHeader 
                    title="Calendar"
                    subTitle=""
                    icon={<EventNoteRoundedIcon fontSize="large" />}
          />
        <Paper style={{
          padding:10,
            maringLeft:30,
            marginTop:50,
            marginBottom:20,
            
            height: 'min-content',
            boxShadow: '0 8px 16px 0 #7a7a7a',
            borderRadius:10,}}>
                
          <FullCalendar 

            
            ref={calendarRef}
            schedulerLicenseKey ='CC-Attribution-NonCommercial-NoDerivatives'

            plugins={[dayGridPlugin, timeGridPlugin,resourceTimelinePlugin]}
            initialView="dayGridMonth"
            //events="https://fullcalendar.io/demo-events.json?start=2021-03-22&end=2021-08-22" edheya mesh valable ken besh nestaamel timeline view
            resources="https://fullcalendar.io/demo-resources.json?with-nesting&with-colors"
            events="https://fullcalendar.io/demo-events.json?single-day&with-nesting&for-resource-timeline"
            //lena ne9ess l back yet3mal fichier.json ba3ed juste naadiw fel resources w el events yaani tawa l khedma maa l back 

            customButtons={{
              myTimeDayBtn: {
                text: "timeDay",
                click() {

                  const calendar = calendarRef.current ;
                  if (calendar) {
                    const calendarApi = calendar.getApi();
                    calendarApi.changeView("timeGridDay");
                  }
                },
              },
              myTimeLineDayBtn: {
                text: "timeLineDay",
                click() {

                  const calendar = calendarRef.current ;
                  if (calendar) {
                    const calendarApi = calendar.getApi();
                    calendarApi.changeView("resourceTimelineDay");
                  }
                },
              },
            }}
          
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridDay,dayGridWeek,dayGridMonth,myTimeDayBtn",

            }}
          />
          </Paper>
          </div>
        )
      }
    }
