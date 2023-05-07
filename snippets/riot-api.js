const { RiotAPI, PlatformId } = require('@fightmegg/riot-api');

const exec = async (apiKey) => {
  // Set up
  const rAPI = new RiotAPI(apiKey);

  // Using the library
  const summoner = await rAPI.summoner.getBySummonerName({
    region: PlatformId.NA1,
    summonerName: "TheDrone7"
  });
  const matches = await rAPI.matchV5.getIdsByPuuid({
    cluster: PlatformId.AMERICAS,
    puuid: summoner.puuid
  });
  const match = await rAPI.matchV5.getMatchById({
    cluster: PlatformId.AMERICAS,
    matchId: matches[0]
  });

  // Returning the match
  return match;
}

module.exports = exec;
