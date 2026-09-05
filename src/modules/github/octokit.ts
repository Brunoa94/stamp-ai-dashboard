import { Octokit } from "@octokit/rest";

const client = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const OctokitClient = { client };
