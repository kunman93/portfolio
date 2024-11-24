import { Project } from "./project";
import { Task } from "./task";

export interface History {
    jobTitle: string
    company: string
    companyLogo: string
    dateFrom: Date
    dateUntil: Date
    projects: Project[]
    task?: Task
}
