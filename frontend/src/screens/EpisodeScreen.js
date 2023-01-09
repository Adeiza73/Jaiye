import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Button,
  Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import {
  listEpisodeDetails,
  createEpisodeReview,
} from '../actions/episodeActions'
import {  EPISODE_CREATE_REVIEW_RESET } from '../constants/episodeConstants'

const  EpisodeScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  let { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const episodeDetails = useSelector((state) => state.episodeDetails)
  const { loading, error, episode } = episodeDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const episodeReviewCreate = useSelector((state) => state.episodeReviewCreate)
  const { success: successEpisodeReview, error: errorEpisodeReview } =
    episodeReviewCreate

  useEffect(() => {
    if (successEpisodeReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type:  EPISODE_CREATE_REVIEW_RESET })
    }
    dispatch(listEpisodeDetails(id))
  }, [dispatch, id, successEpisodeReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createEpisodeReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={episode.name}/>
          <Row>
            <Col md={6}>
              <Image src={episode.image} alt={episode.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{episode.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={episode.rating}
                    text={`${episode.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: #{episode.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {episode.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>#{episode.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {episode.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {episode.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(episode.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Row>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block btn-primary'
                        type='button'
                        disabled={episode.countInStock === 0}
                      >
                        Add to cart
                      </Button>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {episode.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flust'>
                {episode.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text={`${episode.numReviews} review(s)`} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorEpisodeReview && (
                    <Message variant='danger'>{errorEpisodeReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' className='my-3'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review.
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default EpisodeScreen