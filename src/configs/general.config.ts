export const generalConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  appEnv: process.env.APP_ENV || 'local',
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  },
  theGraphUrl: process.env.THE_GRAPH_URL,
  firestore: {
    project_id: process.env.FS_PROJECT_ID,
    client_email: process.env.FS_CLIENT_EMAIL,
    private_key: process.env.FS_PRIVATE_KEY,
  },
});
