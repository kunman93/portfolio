import { NavBarComponent } from './nav-bar.component';
import { Shallow } from 'shallow-render';
import { HeaderModule } from './header.module';
import { GsapAnimationService } from '../services/gsap-animation.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
    let shallow: Shallow<NavBarComponent>;

    beforeEach(() => {
        shallow = new Shallow(NavBarComponent, HeaderModule)
            .mock(GsapAnimationService, {
                gsap: {
                    from: () => { return; },
                    to: () => Promise.resolve("Animation is done")
                }
            })
            .mock(Router, {
                navigate: () => Promise.resolve(true)
            });
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
        expect(find).toBeTruthy();
    });

    describe("template", () => {
        describe("logo and first name", () => {
            it("displays the logo", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                expect(find("#logo")).toBeTruthy();
            });

            describe("first name and job title", () => {
                it("displays the first name and job title", async () => {
                    const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`, { detectChanges: false });
                    const nbsp = "\u00a0";

                    expect(find("#nameOccupation").nativeElement.textContent).toBe(`Manu${nbsp}|${nbsp}Full-Stack Software Engineer`);
                    expect(find("#nameOccupation span").nativeElement.className).toBe("md:inline hidden");
                });

                it("hides the job title", async () => {
                    const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`, { detectChanges: false });
                    expect(find("#nameOccupation span").nativeElement.className).toBe("md:inline hidden");
                });
            });

            it("scrolls to the top when the logo, name or occupation is clicked", async () => {
                // arrange
                const { find, fixture, inject } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                const logoNameOccupationContainer = find("#logoNameOccupationContainer");

                const routerMock = inject(Router);

                // act
                logoNameOccupationContainer.triggerEventHandler("click", {});
                fixture.detectChanges();

                // assert
                expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
            });
        });

        describe("navigation", () => {
            it("hides the navigation for smaller devices", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                expect(find("nav").nativeElement.className).toContain("sm:block hidden");
            });

            it("displays the nav elements", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);

                expect(find("#navAbout").nativeElement.textContent).toBe("About");
                expect(find("#navWork").nativeElement.textContent).toBe("Work");
                expect(find("#navContact").nativeElement.textContent).toBe("Contact");
            });
        });

        describe("dropdown menu", () => {
            it("hides the dropdown menu for larger devices", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                expect(find("#dropdownMenu").nativeElement.className).toContain("sm:hidden flex");
            });

            it("displays the menu icon", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                expect(find("#icon").nativeElement.className).toBeFalsy();

                expect(find("#aboutMenuItem")).toHaveFound(0);
                expect(find("#workMenuItem")).toHaveFound(0);
                expect(find("#contactMenuItem")).toHaveFound(0);
            });

            it("displays the close icon and the dropdown elements on menu button click", async () => {
                // arrange
                const { find, fixture, instance } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                const menuButton = find("#menuButton");

                // act
                menuButton.triggerEventHandler("click", {});
                fixture.detectChanges();

                // assert
                expect(find("#icon").nativeElement.className).toContain("close");
                expect(find("#aboutMenuItem").nativeElement.textContent).toBe("About");
                expect(find("#workMenuItem").nativeElement.textContent).toBe("Work");
                expect(find("#contactMenuItem").nativeElement.textContent).toBe("Contact");
                expect(instance.isSelected).toBeTrue();
            });

            it('closes the dropdown menu on close button click', async () => {
                // arrange
                const { find, fixture, instance, inject } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
                const menuButton = find("#menuButton");

                const zone = inject(NgZone);
                const runOutsideAngularSpy = spyOn(zone, 'runOutsideAngular').and.callThrough();
                const runSpy = spyOn(zone, 'run').and.callThrough();

                // act
                // -- click on menu icon
                expect(instance.isSelected).toBeFalse();
                menuButton.triggerEventHandler("click", {});
                fixture.detectChanges();
                // -- click on close icon
                expect(instance.isSelected).toBeTrue();
                menuButton.triggerEventHandler("click", {});
                fixture.detectChanges();

                await fixture.whenStable();

                // assert
                expect(instance.isSelected).toBeFalse();
                expect(runOutsideAngularSpy).toHaveBeenCalled();
                expect(runSpy).toHaveBeenCalled();
            });
        });
    });
});
