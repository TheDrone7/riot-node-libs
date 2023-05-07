const LeagueJS = require('leaguejs');

const exec = async (apiKey) => {
  // Set up
  const leagueJs = new LeagueJS(apiKey);

  // Using the library
  const summoner = await leagueJs.Summoner.gettingByName('TheDrone7');
  const matches = await leagueJs.Match.gettingMatchIdsByPuuid(summoner.puuid);
  const match = await leagueJs.Match.gettingById(matches[0]);

  // Returning the match
  return match;
}

module.exports = exec;
