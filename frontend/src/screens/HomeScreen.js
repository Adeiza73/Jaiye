import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Episode from '../components/Episode'
import { listEpisodes } from '../actions/episodeActions'
import  Header2  from '../components/Header2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import EpisodeCarousel from '../components/EpisodeCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
  let [searchParams] = useSearchParams()
  let keyword = ''
  let pageNumber = 1
  searchParams.get('keyword')
    ? (keyword = searchParams.get('keyword'))
    : (keyword = '')

  searchParams.get('pageNumber')
    ? (pageNumber = searchParams.get('pageNumber'))
    : (pageNumber = 1)

  const dispatch = useDispatch()

  const episodeList = useSelector((state) => state.episodeList)

  const { loading, error, episodes, page, pages } = episodeList

  useEffect(() => {
    dispatch(listEpisodes(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <EpisodeCarousel />
      ) : (
        <Link to='/' className='btn btn-primary'>
          Go Back
        </Link>
      )}
        
        <Header2 /> 
      <h1>Trending Events</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {episodes.map((episode) => (
              <Col key={episode._id} sm={12} md={6} lg={4} xl={3}>
                <Episode episode={episode} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen