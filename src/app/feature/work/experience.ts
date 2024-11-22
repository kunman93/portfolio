import { Project } from "./project";
import { Task } from "./task";

export interface Experience {
    jobTitle: string
    company: string
    projects: Project[]
    task?: Task
}
