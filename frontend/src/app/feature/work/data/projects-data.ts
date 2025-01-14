import { Project } from "../models/project";
import { PROJECTS } from "assets/assets.constants";

export const projects: Project[] = [
    {
        githubUrl: "https://github.com/kunman93/portfolio",
        img: {
            srcImage: PROJECTS.portfolio.img,
            srcGif: PROJECTS.portfolio.gif,
            alt: "Porfolio Image"
        },
        title: "Portfolio",
        description: "A portfolio of who I am and what I have done so far.",
        technologies: ["Angular", "TypeScript", "Tailwind", "Threejs", "Cypress", "Cucumber", "Git", "Docker", "DockerCompose", "GitHubActions"],
        task: undefined
    },
    {
        githubUrl: "https://github.com/kunman93/soundboard",
        img: {
            srcImage: PROJECTS.spaceRunner.img,
            srcGif: PROJECTS.spaceRunner.gif,
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
            srcImage: PROJECTS.soundboard.img,
            srcGif: PROJECTS.soundboard.gif,
            alt: "Soundboard Image"
        },
        title: "Soundboard",
        description: "A sound board on which you can create your own sounds with an easy-to-use graphical user interface.",
        technologies: ["Java", "JavaFX", "CSS", "Gradle", "Git"],
        task: undefined
    }
];