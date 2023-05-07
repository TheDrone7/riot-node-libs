const { LolApi, Constants } = require('twisted');

const exec = async (apiKey) => {
  // Set up
  const api = new LolApi({
    key: apiKey
  });

  // Using the library
  const summoner = await api.Summoner.getByName(
    'TheDrone7',
    Constants.Regions.AMERICA_NORTH
  );
  const matches = await api.MatchV5.list(
    summoner.response.puuid,
    Constants.RegionGroups.AMERICAS
  );
  const match = await api.MatchV5.get(
    matches.response[0],
    Constants.RegionGroups.AMERICAS
  );

  // Returning the match
  return match;
}

module.exports = exec;
