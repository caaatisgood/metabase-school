import React from 'react'
import Head from 'next/head'
import siteMetadata from '../constants/siteMetadata'
import getImage from '../utils/getImage'

interface Props {
  title?: string
}

const FAVICON_SIZES = [48, 72, 96, 144, 192, 256, 384, 512]
const FAVICONS = FAVICON_SIZES.map((size) => ({
  rel: 'icon',
  sizes: `${size}x${size}`,
  path: `/favicons/icon-${size}.png`,
}))

const seo: React.FC<Props> = (props) => {
  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : siteMetadata.title
  const OG_IMAGE_PATH = getImage('/og.png')

  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:description' content={siteMetadata.description} />
      <meta property='og:url' content={siteMetadata.host} />
      <meta property='og:image' content={OG_IMAGE_PATH} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={siteMetadata.description} />
      <meta property='twitter:image' content={OG_IMAGE_PATH} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:creator' content={siteMetadata.creator} />
      {FAVICONS.map(({ path, rel, sizes }) => (
        <link key={path} rel={rel} sizes={sizes} href={getImage(path)} />
      ))}
    </Head>
  )
}

export default seo
