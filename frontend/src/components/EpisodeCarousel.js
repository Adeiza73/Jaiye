import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopEpisodes } from '../actions/episodeActions'

const EpisodeCarousel = () => {
  const dispatch = useDispatch()

  const episodeTopRated = useSelector((state) => state.episodeTopRated)
  const { loading, error, episodes } = episodeTopRated

  useEffect(() => {
    dispatch(listTopEpisodes())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {episodes.map((episode) => (
        <Carousel.Item key={episode._id}>
          <Link to={`/episode/${episode._id}`}>
            <Image src={episode.image} alt={episode.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {episode.name} (${episode.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default EpisodeCarousel