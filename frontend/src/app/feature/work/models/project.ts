import { Task } from "./task";
import { Image } from "shared/models/image";

export interface Project {
    githubUrl?: string;
    img?: Image;
    title: string;
    description: string; 
    task?: Task;
    technologies?: string[];
}
