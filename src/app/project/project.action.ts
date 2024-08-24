"use server"
import { TGithubCredential } from "@/types/github-credential";
import { TCreateProjectForm } from "./project.type";
import { getRepoInfo, getRepoTree } from "../../utils/github.util";
import { IActionResponse } from "@/types/global-action.type";
import { projectRepository } from "@/database/repositories/project-repository";
import { Project } from "@prisma/client";

async function getSourceTree(credential: TGithubCredential): Promise<string> {
  const repoInfo = await getRepoInfo(credential);

  const sha = repoInfo?.commit?.sha;

  const tree  = await getRepoTree(credential, sha)

  return JSON.stringify(tree?.tree);
}

export async function createProjectAction(
  data: TCreateProjectForm
): Promise<IActionResponse<string | null>> {
  try {
    // GET SOURCE CODE FROM THE REPOSITORY
    const sourceCode = await getSourceTree({
      token: data.repoToken,
      owner: data.repoOwner,
      repo: data.repoName,
      branch: data.repoBranch,
    });

    // CREATE A NEW PROJECT
    await projectRepository.create({ ...data, sourceCode });

    return {
      success: true,
      message: "Create project successfully",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: JSON.stringify(error),
    };
  }
}

export async function getAllProjectAction(): Promise<IActionResponse<Project[] | string>> {
  try {
    const projects = await projectRepository.getAll();

    return {
      success: true,
      message: "Get all projects successfully",
      data: projects,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: JSON.stringify(error),
    };
  }
}
