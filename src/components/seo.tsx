import React from 'react'
import Head from 'next/head'
import siteMetadata from '../constants/siteMetadata'

type Props = {
  title?: string
}

const seo: React.FC<Props> = (props) => {
  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : siteMetadata.title

  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default seo
