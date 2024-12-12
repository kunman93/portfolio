import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';
import { employmentReferences } from '../data/employment-reference-data';
import { EmploymentReference } from '../models/employment-reference';
import { EmploymentReferenceCarouselComponent } from './employment-reference-carousel.component';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

describe('EmploymentReferenceCarouselComponent', () => {
    let shallow: Shallow<EmploymentReferenceCarouselComponent>;

    beforeEach(() => {
        shallow = new Shallow(EmploymentReferenceCarouselComponent, WorkModule)
            .mock(GsapAnimationService, {
                gsap: {
                    from: () => Promise.resolve(true)
                }
            });
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        describe('employment reference cards', () => {
            it('displays employment reference cards', async () => {
                const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                const employmentReferenceCards = find('#employmentReferenceCard');

                expect(employmentReferenceCards).toHaveFound(2);
            });

            it('displays the employment reference texts', async () => {
                const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                const quotes = find('#employmentReferenceCard #quote');
                const employmentReferenceTexts = find('#employmentReferenceCard #employmentReferenceText');

                expect(quotes).toHaveFound(2);
                expect(quotes[0].nativeElement.textContent).toBe('"');
                expect(quotes[1].nativeElement.textContent).toBe('"');
                expect(employmentReferenceTexts).toHaveFound(2);
                expect(employmentReferenceTexts[0].nativeElement.textContent).toBe('Thanks to his great motivation and curiosity, Mr Kunnumpurathu quickly familiarised himself with various areas of responsibility. He completed the work assigned to him quite independently and to our complete satisfaction. He worked systematically, carefully and produced good quality work.');
                expect(employmentReferenceTexts[1].nativeElement.textContent).toBe('We got to know Mr Kunnumpurathu as an enthusiastic, intelligent and interested employee. He is characterised by an independent, careful and precise way of working. He completed his tasks very cleanly, accurately and reliably.');
            });

            it('displays the institutions and their logos', async () => {
                // arrange
                const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                const institutions = find('#employmentReferenceCard #institution');
                const logos = find('#employmentReferenceCard #logo');

                // assert
                expect(institutions).toHaveFound(2);
                expect(institutions[0].nativeElement.textContent).toBe('@K&W Software AG');
                expect(institutions[1].nativeElement.textContent).toBe('@Keller AG');
                expect(logos).toHaveFound(2);
                expect(logos[0].nativeElement.src).toContain('kwsoft.png');
                expect(logos[0].nativeElement.alt).toContain('K&W Software AG Logo');
                expect(logos[1].nativeElement.src).toContain('keller-ag.png');
                expect(logos[1].nativeElement.alt).toContain('Keller AG Logo');
            });
        });

        describe('buttons', () => {
            describe('previous button', () => {
                it('displays the previous button', async () => {
                    const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                    const previousIcon = find('#previousIcon');

                    expect(previousIcon).toHaveFound(1);
                    expect(previousIcon.attributes['class']).toContain('fa-solid fa-circle-arrow-left');
                });

                [
                    {
                        currentIndex: 1,
                        expectedCurrentIndex: 0,
                    },
                    {
                        currentIndex: 0,
                        expectedCurrentIndex: 2
                    }
                ].forEach(params => {
                    it('decrements the index by 1 when the previous button is clicked', async () => {
                        // arrange
                        const { find, instance } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                        const previousButton = find('#previousButton');

                        const references: EmploymentReference[] = [
                            ...employmentReferences,
                            {
                                institution: "Unicorn AG",
                                logo: {
                                    srcImage: "unicorn.png",
                                    alt: "Unicorn AG Logo",
                                },
                                reference: "He wants to be a unicorn",
                            }
                        ];
                        Object.defineProperty(instance, 'employmentReferences', { value: references, writable: false });

                        instance.currentIndex = params.currentIndex;

                        // act
                        previousButton.nativeElement.click();

                        // assert
                        expect(instance.currentIndex).toEqual(params.expectedCurrentIndex);
                    });
                });
            });

            describe('next button', () => {
                it('displays the next button', async () => {
                    const { find } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                    const nextIcon = find('#nextIcon');

                    expect(nextIcon).toHaveFound(1);
                    expect(nextIcon.attributes['class']).toContain('fa-solid fa-circle-arrow-right');
                });

                [
                    {
                        currentIndex: 1,
                        expectedCurrentIndex: 2,
                    },
                    {
                        currentIndex: 2,
                        expectedCurrentIndex: 0
                    }
                ].forEach(params => {
                    it('increments the index by 1 when the next button is clicked', async () => {
                        // arrange
                        const { find, instance } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                        const nextButton = find('#nextButton');

                        const references: EmploymentReference[] = [
                            ...employmentReferences,
                            {
                                institution: "Unicorn AG",
                                logo: {
                                    srcImage: "unicorn.png",
                                    alt: "Unicorn AG Logo",
                                },
                                reference: "He wants to become a unicorn",
                            }
                        ];
                        Object.defineProperty(instance, 'employmentReferences', { value: references, writable: false });

                        instance.currentIndex = params.currentIndex;

                        // act
                        nextButton.nativeElement.click();

                        // assert
                        expect(instance.currentIndex).toEqual(params.expectedCurrentIndex);
                    });
                });
            });
        });


        describe('dots / indicatior', () => {
            it('displays the stone-colored dots and a white-colored indicator', async () => {
                // arrange
                const { find, instance, fixture } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);

                const references: EmploymentReference[] = [
                    ...employmentReferences,
                    {
                        institution: "Unicorn AG",
                        logo: {
                            srcImage: "unicorn.png",
                            alt: "Unicorn AG Logo",
                        },
                        reference: "He wants to become a unicorn",
                    }
                ];
                Object.defineProperty(instance, 'employmentReferences', { value: references, writable: false });
                instance.currentIndex = 2;

                // act
                fixture.detectChanges();

                // assert
                const dots = find('#dot');
                expect(dots).toHaveFound(3);
                expect(dots[0].nativeElement.attributes.class.value).toContain('bg-stone-900');
                expect(dots[1].nativeElement.attributes.class.value).toContain('bg-stone-900');
                expect(dots[2].nativeElement.attributes.class.value).toContain('bg-white');
            });

            it('updates the index on click', async () => {
                // arrange
                const { find, instance } = await shallow.render(`<app-employment-reference-carousel></app-employment-reference-carousel>`);
                const dot = find('#dot');

                const references: EmploymentReference[] = [
                    ...employmentReferences,
                    {
                        institution: "Unicorn AG",
                        logo: {
                            srcImage: "unicorn.png",
                            alt: "Unicorn AG Logo",
                        },
                        reference: "He wants to become a unicorn",
                    }
                ];
                Object.defineProperty(instance, 'employmentReferences', { value: references, writable: false });
                instance.currentIndex = 3;

                // act
                dot[0].nativeElement.click();

                // assert
                expect(instance.currentIndex).toEqual(0);
            });
        });
    });
});
