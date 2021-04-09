module.exports = {
  type: process.env.FB_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FB_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  client_email: process.env.FB_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FB_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FB_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FB_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FB_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
}
