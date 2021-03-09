import NextLink, { LinkProps } from 'next/link'

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => (
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>
)

export default Link
