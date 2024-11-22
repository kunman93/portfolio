import { Task } from "./task";

export interface Project {
    title: string,
    description: string, 
    task?: Task
}
