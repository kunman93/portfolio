import { History } from "../models/history";

export const workExperiences: History[] = [
    {
        title: "Full-Stack Software Engineer",
        institution: "K&W Software AG",
        logo: {
            srcImage: "k&w.png",
            alt: "K&W Logo"
        },
        timePeriod: {
            dateFrom: new Date(2022, 10),
            dateUntil: new Date(2024, 7)
        },
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
    }
];
