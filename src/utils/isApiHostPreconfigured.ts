import config from '../config'

const isApiHostPreconfigured = () => !!config.metabaseApiHost

export default isApiHostPreconfigured
