import NextLink, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  title: string
}

const Link: React.FC<Props> = ({ href, children, title, ...props }) => (
  <NextLink href={href}>
    <a {...props} title={title}>
      {children}
    </a>
  </NextLink>
)

export default Link
