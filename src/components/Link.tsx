import NextLink, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  title: string
  className?: string
}

const Link: React.FC<Props> = ({ href, children, title, className, ...props }) => (
  <NextLink href={href}>
    <a {...props} title={title} className={className}>
      {children}
    </a>
  </NextLink>
)

export default Link
