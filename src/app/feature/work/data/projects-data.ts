import { assetsPath } from "assets/assets-path-index";
import { Project } from "../models/project";

const assetsPathProject = assetsPath.projects; 
export const projects: Project[] = [
    {
        githubUrl: "https://github.com/kunman93/soundboard",
        img: {
            srcImage: `${assetsPathProject}/space-runner.png`,
            srcGif: `${assetsPathProject}/space-runner.gif`,
            alt: "Space Runner Image"
        },
        title: "Space Runner",
        description: "Realisation of a two-dimensional endless runner game in which a player travels as far as possible through space in a spaceship, collecting coins and power-ups and avoiding dangers.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    },
    {
        githubUrl: "https://github.com/kunman93/space-runner",
        img: {
            srcImage: `${assetsPathProject}/soundboard.png`,
            srcGif: `${assetsPathProject}/soundboard.gif`,
            alt: "Soundboard Image"
        },
        title: "Soundboard",
        description: "A sound board on which you can create your own sounds with an easy-to-use graphical user interface.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    }
];