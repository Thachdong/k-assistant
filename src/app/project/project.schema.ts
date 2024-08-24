import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
    title: yup.string().required("Project title is required"),
    description: yup.string().required("Project description is required"),
    repoName: yup.string().required("Repository name is required"),
    repoOwner: yup.string().required("Repository owner is required"),
    repoToken: yup.string().required("Repository token is required"),
    repoBranch: yup.string().required("Repository branch is required"),
});