const LeagueApi = require('leagueapiwrapper');

const exec = async (apiKey) => {
  // Set up
  const lApi = new LeagueApi(apiKey, 'na1');

  // Using the library
  const summoner = await lApi.getSummonerByName('TheDrone7');
  lApi.region = 'americas';
  const matches = await lApi.getMatchList(summoner);
  const match = await lApi.getMatch(matches[0]);

  // Returning the match
  return match;
}

module.exports = exec;
