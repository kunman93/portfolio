import { Project } from "./project";
import { Task } from "./task";

export interface History {
    profession: string
    institution: string
    logo: string
    dateFrom: Date
    dateUntil: Date
    projects: Project[]
    task?: Task
}
