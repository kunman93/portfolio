import { Project } from "./project";
import { Task } from "./task";
import { Image } from "shared/models/image"
import { TimePeriod } from "./time-period";

export interface History {
    title: string;
    institution: string;
    logo: Image;
    timePeriod: TimePeriod;
    projects: Project[];
    task?: Task;
}
