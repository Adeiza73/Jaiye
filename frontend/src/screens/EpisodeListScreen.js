import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listEpisodes,
  deleteEpisode,
  createEpisode,
} from '../actions/episodeActions'
import { EPISODE_CREATE_RESET } from '../constants/episodeConstants'

const EpisodeListScreen = () => {
  let [searchParams] = useSearchParams()
  let pageNumber = ''

  searchParams.get('pageNumber')
  ? (pageNumber = searchParams.get('pageNumber'))
  : (pageNumber = 1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const episodeList = useSelector((state) => state.episodeList)
  const { loading, error, episodes, page, pages } = episodeList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const episodeDelete = useSelector((state) => state.episodeDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = episodeDelete

  const episodeCreate = useSelector((state) => state.episodeCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    episode: createdEpisode,
  } = episodeCreate

  useEffect(() => {
    dispatch({ type: EPISODE_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/episodes/${createdEpisode._id}/edit`)
    } else {
      dispatch(listEpisodes('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdEpisode,
    pageNumber
  ])

  const createEpisodeHandler = () => {
    dispatch(createEpisode())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEpisode(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Events</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='my-3 ' onClick={createEpisodeHandler}>
            <i className='fas fa-plus'></i> Create Event
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr key={episode._id}>
                  <td>{episode._id}</td>
                  <td>{episode.name}</td>
                  <td>${episode.price}</td>
                  <td>{episode.category}</td>
                  <td>{episode.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/episodes/${episode._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(episode._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true}/>
        </>
      )}
    </>
  )
}

export default EpisodeListScreen