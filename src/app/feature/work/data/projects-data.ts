import { Project } from "../models/project";

export const assetsPath = "assets/img/projects";
export const projects: Project[] = [
    {
        githubUrl: "https://github.com/kunman93/soundboard",
        img: {
            pngUrl: `${assetsPath}/space-runner.png`,
            gifUrl: `${assetsPath}/space-runner.gif`
        },
        title: "Space Runner",
        description: "Realisation of a two-dimensional endless runner game in which a player travels as far as possible through space in a spaceship, collecting coins and power-ups and avoiding dangers.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    },
    {
        githubUrl: "https://github.com/kunman93/space-runner",
        img: {
            pngUrl: `${assetsPath}/soundboard.png`,
            gifUrl: `${assetsPath}/soundboard.gif`
        },
        title: "Soundboard",
        description: "A sound board on which you can create your own sounds with an easy-to-use graphical user interface.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    }
];