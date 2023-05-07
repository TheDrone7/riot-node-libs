const { Client } = require('shieldbow');

const exec = async (apiKey) => {
  // Set up
  const shieldbow = new Client(apiKey);
  await shieldbow.initialize();

  // Using the library
  const summoner = await shieldbow.summoners.fetchBySummonerName('TheDrone7');
  const matches = await summoner.fetchMatchList();
  const match = await shieldbow.matches.fetch(matches[0]);

  // Returning the match
  match.client = undefined;
  return match;
}

module.exports = exec;
