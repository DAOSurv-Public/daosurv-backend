export const generalConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  appEnv: process.env.APP_ENV || 'local',
  twitterApiKey: process.env.TWITTER_API_KEY,
  theGraphUrl: process.env.THE_GRAPH_URL,
});
