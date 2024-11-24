import { History } from "../models/history";

export const assetsPath = "assets/img/institution";
export const workExperiences: History[] = [
    {
        profession: "Full-Stack Software Engineer",
        institution: "K&W Software AG",
        logo: "k&w.png",
        dateFrom: new Date(2022, 10),
        dateUntil: new Date(2024, 7),
        projects: [
            {
                title: "ELA Kredit",
                description: `A workflow-based web application developed by K&W 
                    which ensures end-to-end coverage of the mortgage process 
                    from loan application to loan processing.`
            },
            {
                title: "aserto",
                description: `A web application developed by K&W which guides users efficiently
                    through the debt collection process and actively supports them with
                    pre-legal debt collection knowledge.`
            }
        ],
        task: {
            taskTitle: "Task / Responsibilities",
            tasks: [
                `Implementation and testing of the backend infrastructure
                    (persistence, service layer and REST API) in Java with Spring
                    Boot, Spring Data REST, Hibernate, Oracle, PostgreSQL.`,
                `Implementation and testing of GUI and functions in TypeScript,
                    HTML5 / CSS with Angular.`
            ]
        }
    },
    {
        profession: "Unicorn",
        institution: "One-Man-Army",
        logo: "unicorn.png",
        dateFrom: new Date(2019, 8),
        dateUntil: new Date(2022, 6),
        projects: [
            {
                title: "The Art of War",
                description: "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.",
            }
        ]
    },
    {
        profession: "Batman",
        institution: "Batcave",
        logo: "batman.png",
        dateFrom: new Date(2013, 8),
        dateUntil: new Date(2018, 6),
        projects: [
            {
                title: "Gotham",
                description: "Bruce Wayne by day, Batman at night",
            }
        ]
    }
];
