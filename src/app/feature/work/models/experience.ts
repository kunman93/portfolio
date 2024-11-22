import { Project } from "./project";
import { Task } from "./task";

export interface Experience {
    jobTitle: string
    company: string
    companyLogo: string
    dateFrom: Date
    dateUntil: Date
    projects: Project[]
    task?: Task
}
