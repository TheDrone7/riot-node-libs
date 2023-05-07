import { H3Event } from 'h3';
import { Octokit } from 'octokit';

export default defineEventHandler(async (event: H3Event) => {
  const owner = event.context.params?.username!;
  const repo = event.context.params?.lib!;
  const ghAuth = process.env.GITHUB_API_KEY;
  const octokit = new Octokit({
    auth: ghAuth
  });

  const result = await octokit.rest.repos.get({
    owner,
    repo
  });

  return result.data;
})
