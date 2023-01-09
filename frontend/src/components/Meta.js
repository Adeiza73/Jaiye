import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return <Helmet>
    <title>{title}</title>
    <Meta name='description' content={description} />
    <Meta name='keywords' content={keywords} />
  </Helmet>
}

Meta.defaultProps = { 
  title: 'Welcome To Jaiye',
  description: 'Checkout trending and big name events close to you!',
  keywords: 'events, shows, parties '
}

export default Meta