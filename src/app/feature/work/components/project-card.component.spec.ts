import { ProjectCardComponent } from './project-card.component';
import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';
import { Project } from '../models/project';

describe('ProjectCardComponent', () => {
    let shallow: Shallow<ProjectCardComponent>;
    let project: Project;

    beforeEach(() => {
        shallow = new Shallow(ProjectCardComponent, WorkModule);
        project = {
            githubUrl: "githubUrl",
            img: { srcImage: "project-img.png", srcGif: "project-img.gif", alt: "project alt" },
            title: "Front-end Project",
            description: "lorem ipsum",
            technologies: ["Angular", "Tailwind"],
            task: undefined
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { project } });
        expect(find).toBeTruthy();
    });

    describe("ngOnInit", () => {
        [
            {
                githubUrl: "",
                img: undefined,
                title: "title",
                description: "description",
                technologies: ["Angular", "Tailwind"]
            },
            {
                githubUrl: undefined,
                img: { srcImage: "project-img.png", srcGif: "project-img.png", alt: "alt" },
                title: "title",
                description: "description",
                technologies: ["Angular", "Tailwind"]
            },
            {
                img: undefined,
                title: "title",
                description: "description",
                technologies: ["Angular", "Tailwind"]
            },
            {
                githubUrl: "github url",
                img: { srcImage: "project-img.png", srcGif: "project-img.png", alt: "alt" },
                title: "",
                description: "description",
                technologies: ["Angular", "Tailwind"]
            },
            {
                githubUrl: "github url",
                img: { srcImage: "project-img.png", srcGif: "project-img.png", alt: "alt" },
                title: "title",
                description: "",
                technologies: ["Angular", "Tailwind"]
            },
            {
                githubUrl: "github url",
                img: { srcImage: "project-img.png", srcGif: "project-img.png", alt: "alt" },
                title: "title",
                description: "description",
                technologies: undefined
            }
        ].forEach(param => {
            it(`throws an error if project has falsy properties`, async () => {
                // arrange
                const { instance } = await shallow.render({ bind: { project } });

                project.githubUrl = param.githubUrl
                project.img = param.img;
                project.title = param.title;
                project.description = param.description;
                project.technologies = param.technologies;
                instance.project = project;

                // assert
                expect(() => instance.ngOnInit()).toThrow(new Error('project has falsy properties'));
            });
        });
    });

    it('displays the project card', async () => {
        // arrange
        const { find } = await shallow.render({ bind: { project } });

        const img = find('#image');
        const gitHubIcon = find('#githubIcon');
        const title = find('#title');
        const description = find('#description');
        const technologies = find('#technology');

        // assert
        expect(img.nativeElement.src).toContain(project.img?.srcImage);
        expect(gitHubIcon.nativeElement.className).toContain("fa-brands fa-square-github");
        expect(title.nativeElement.textContent).toBe(project.title);
        expect(description.nativeElement.textContent).toBe(project.description);
        expect(technologies.map(t => t.nativeElement.textContent)).toEqual(["#Angular", "#Tailwind"]);
    });

    describe('image', () => {
        it('toggles gif and image on click', async () => {
            // arrange
            const { find, fixture } = await shallow.render({ bind: { project } });
            const img = find('#image');

            // act
            img.triggerEventHandler("touchstart", {});
            fixture.detectChanges();

            // assert
            expect(img.nativeElement.src).toContain(project.img?.srcGif);

            // act
            img.triggerEventHandler("touchstart", {});
            fixture.detectChanges();

            // assert
            expect(img.nativeElement.src).toContain(project.img?.srcImage);
        });

        it('displays gif on mouse over', async () => {
            // arrange
            const { find, fixture } = await shallow.render({ bind: { project } });
            const img = find('#image');

            // act
            img.triggerEventHandler("mouseover", {});
            fixture.detectChanges();

            // assert
            expect(img.nativeElement.src).toContain(project.img?.srcGif);
        });

        it('displays png image on mouse leave', async () => {
            // arrange
            const { find, fixture } = await shallow.render({ bind: { project } });
            const img = find('#image');

            // act
            img.triggerEventHandler("mouseleave", {});
            fixture.detectChanges();

            // assert
            expect(img.nativeElement.src).toContain(project.img?.srcImage);
        });
    });


    it('open a new tab with the repo, when the github icon is clicked', async () => {
        const { find } = await shallow.render({ bind: { project } });
        const gitHubIconLink = find('a');

        expect(gitHubIconLink.nativeElement.target).toContain("_blank");
        expect(gitHubIconLink.nativeElement.href).toContain(project.githubUrl);
    });
});
