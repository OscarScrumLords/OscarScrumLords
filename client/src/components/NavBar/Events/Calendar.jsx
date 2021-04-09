import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import RenderEventTile from './RenderEventTile.jsx'


const Div = styled.div`

.react-calendar {
  width: 3000px;
  max-width: 100%;
  background: whitesmoke;
  border: 1px solid #a0a096;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  color: gainsboro;
  padding: 30px 20px 0;
}
`;
//

const Events = ({events}) => {
  console.log('events', events)

  const [selectedDate, setDate] = useState(new Date());

  const onChange = selectedDate => {
    setDate(selectedDate)
  }

  const eventsOnDate = events.filter(event => {

    const formatDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`

    // console.log(formatDate)
    // console.log(event.date_id.slice(0, 10).replaceAll('-0', '-'))

    return event.date_id.slice(0, 10).replaceAll('-0', '-') === formatDate
  })

  return (
    <Div>
      <Container>
        <Calendar
          onChange={onChange}
          value={selectedDate}
        />
        {<RenderEventTile events={eventsOnDate} date={selectedDate}/>}
      </Container>
    </Div>

  );
};

export default Events;