import { Component } from '@angular/core';
import { Experience } from './experience';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    private readonly experiences: Experience[] = [
        {
            jobTitle: "Full-Stack Software Engineer",
            company: "K&W Software AG",
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
            jobTitle: "Unicorn",
            company: "One-Man-Army",
            projects: [
                    {
                        title: "The Art of War",
                        description: "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.",
                    }
            ]
        }
    ];

    getExperiences(): Experience[] {
        return this.experiences;
    }
}
