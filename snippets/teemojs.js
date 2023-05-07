const TeemoJS = require('teemojs');

const exec = async (apiKey) => {
  // Set up
  const teemo = TeemoJS(apiKey);

  // Using the library
  const summoner = await teemo.get(
    'na1',
    'summoner.getBySummonerName',
    'TheDrone7'
  );
  const matches = await teemo.get(
    'americas',
    'match.getMatchIdsByPUUID',
    summoner.puuid
  );
  const match = await teemo.get(
    'americas',
    'match.getMatch',
    matches[0]
  );

  // Returning the match
  return match;
}

module.exports = exec;
