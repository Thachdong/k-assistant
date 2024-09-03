"use client"
import { TGithubCredential } from "@/types/github-credential";
import axios from "axios";

export async function githubFetcher(url: string, token: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return response.data;
}

export async function getRepoInfo(credential: TGithubCredential) {
  const branchUrl = `https://api.github.com/repos/${credential.owner}/${credential.repo}/branches/${credential.branch}`;

  return await githubFetcher(branchUrl, credential.token);
}

export async function getRepoTree(credential: Omit<TGithubCredential, 'branch'>, sha: string) {
  const treeUrl = `https://api.github.com/repos/${credential.owner}/${credential.repo}/git/trees/${sha}?recursive=1`;
    
  return await githubFetcher(treeUrl, credential.token);
}

export async function getRepoFileContent(credential: TGithubCredential, path: string) {
  "use client"
  const fileUrl = `https://api.github.com/repos/${credential.owner}/${credential.repo}/contents/${path}?ref=${credential.branch}`;

  const encodedContent = await githubFetcher(fileUrl, credential.token);

  const decodeContent = await Buffer.from(encodedContent.content, "base64").toString();

  return decodeContent;
}