import { Project } from "./project";
import { Task } from "./task";
import { Image } from "shared/models/image"

export interface History {
    profession: string;
    institution: string;
    logo: Image;
    dateFrom: Date;
    dateUntil: Date;
    projects: Project[];
    task?: Task;
}
