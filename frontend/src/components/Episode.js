import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Episode = ({ episode }) => {
    return(
        <Card className='my-3 p-3 rounded' color='dark'>
            <Link to={`/episode/${episode._id}`}>
                <Card.Img src={episode.image} variant='top' /> 
            </Link>
            <Card.Body>
            <Link to={`/episode/${episode._id}`}>
                <Card.Title as='div'><strong>{episode.name}</strong></Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'><i class="fa-thin fa-calendar-days"></i>{episode.date}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'><i class="fa-light fa-location-dot"></i>{episode.location}</div>
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Episode