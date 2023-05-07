const GaleforceModule = require('galeforce');

const exec = async (apiKey) => {
  // Set up
  const galeforce = new GaleforceModule({
    'riot-api': {
      key: apiKey
    }
  });

  // Using the library
  const summoner = await galeforce.lol.summoner()
    .region(galeforce.region.lol.NORTH_AMERICA)
    .name('TheDrone7')
    .exec();
  const matches = await galeforce.lol.match.list()
    .region(galeforce.region.riot.AMERICAS)
    .puuid(summoner.puuid)
    .exec();
  const match = await galeforce.lol.match.match()
    .region(galeforce.region.riot.AMERICAS)
    .matchId(matches[0])
    .exec();

  // Returning the match
  return match;
}

module.exports = exec;
