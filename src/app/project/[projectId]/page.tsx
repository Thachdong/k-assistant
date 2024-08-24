import { projectRepository } from "@/database/repositories/project-repository";

type TProps = {
    params: {
        projectId: string;
    }
}

export default async function ProjectDetailPage({ params: { projectId } }: TProps) {
    const projectDetail = await projectRepository.getById(projectId);

    return <div>Project detail page</div>
}