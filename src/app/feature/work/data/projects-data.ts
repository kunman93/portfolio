import { assetsPath } from "../../../../../public/assets/assets-path-index";
import { Project } from "../models/project";

const assetsPathProject = assetsPath.projects; 
export const projects: Project[] = [
    {
        githubUrl: "https://github.com/kunman93/soundboard",
        img: {
            pngUrl: `${assetsPathProject}/space-runner.png`,
            gifUrl: `${assetsPathProject}/space-runner.gif`
        },
        title: "Space Runner",
        description: "Realisation of a two-dimensional endless runner game in which a player travels as far as possible through space in a spaceship, collecting coins and power-ups and avoiding dangers.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    },
    {
        githubUrl: "https://github.com/kunman93/space-runner",
        img: {
            pngUrl: `${assetsPathProject}/soundboard.png`,
            gifUrl: `${assetsPathProject}/soundboard.gif`
        },
        title: "Soundboard",
        description: "A sound board on which you can create your own sounds with an easy-to-use graphical user interface.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    }
];