import { TwitterApi } from 'twitter-api-v2';

// Verificar las variables (por si alguna falta)
if (!process.env.TWITTER_API_KEY) throw new Error('Falta TWITTER_API_KEY');
if (!process.env.TWITTER_API_SECRET) throw new Error('Falta TWITTER_API_SECRET');
if (!process.env.TWITTER_ACCESS_TOKEN) throw new Error('Falta TWITTER_ACCESS_TOKEN');
if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('Falta TWITTER_ACCESS_TOKEN_SECRET');

// Inicializar cliente de Twitter
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

(async () => {
  try {
    // Lógica principal: Obtener conteo de tweets con el hashtag #arte
    const hashtag = '#arte';
    const counts = await twitterClient.v2.tweetCountRecent({ query: hashtag });
    const totalTweets = counts.meta.total_tweet_count;

    // Construir el texto del tweet
    const textoTweet = `En las últimas 24 horas, el hashtag ${hashtag} fue usado ${totalTweets} veces. 🌟 ¡El arte sigue inspirando al mundo!`;

    // Publicar el tweet
    const tweet = await twitterClient.v2.tweet(textoTweet);
    console.log('Tweet publicado con éxito:', tweet);
  } catch (error) {
    console.error('Error al procesar el conteo o publicar el tweet:', error);
  }
})();
