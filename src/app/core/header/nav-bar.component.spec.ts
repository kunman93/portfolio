import { NavBarComponent } from './nav-bar.component';
import { Shallow } from 'shallow-render';
import { CoreModule } from '../core.module';

describe('NavBarComponent', () => {
  let shallow: Shallow<NavBarComponent>;

  beforeEach(() => {
    shallow = new Shallow(NavBarComponent, CoreModule);
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

                expect(find("#nameOccupation").nativeElement.textContent).toBe(`Manu${nbsp}|${nbsp}Fullstack Software Engineer`);
                expect(find("#nameOccupation span").nativeElement.className).toBe("sm:inline hidden");
            });

            it("hides the job title", async () => {
                const { find } = await shallow.render(`<app-nav-bar></app-nav-bar>`, { detectChanges: false });
                expect(find("#nameOccupation span").nativeElement.className).toBe("sm:inline hidden");
            });
        });

        it("scroll to the top when the logo, name or occupation is clicked", async () => {
            // arrange
            const { find, fixture } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
            const logoNameOccupationContainer = find("#logoNameOccupationContainer");
            const scrollMock = spyOn(window, 'scroll').and.callThrough();

            // act
            logoNameOccupationContainer.triggerEventHandler("click", {});
            fixture.detectChanges();

            // assert
            expect(scrollMock).toHaveBeenCalled();
        });
    });

    describe ("navigation", () => {
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
        expect(find("#menuIcon").nativeElement.className).toContain("fa-solid fa-bars");

        expect(find("#closeIcon")).toHaveFound(0);
        expect(find("#aboutMenuItem")).toHaveFound(0);
        expect(find("#workMenuItem")).toHaveFound(0);
        expect(find("#contactMenuItem")).toHaveFound(0);
      });

      it("displays the x-mark icon and the dropdown elements", async () => {
        // arrange
        const { find, fixture } = await shallow.render(`<app-nav-bar></app-nav-bar>`);
        const menuIcon = find("#menuIcon");
        
        // act
        menuIcon.triggerEventHandler("click", {});
        fixture.detectChanges();

        // assert
        expect(find("#closeIcon").nativeElement.className).toContain("fa-solid fa-xmark");
        expect(find("#aboutMenuItem").nativeElement.textContent).toBe("About");
        expect(find("#workMenuItem").nativeElement.textContent).toBe("Work");
        expect(find("#contactMenuItem").nativeElement.textContent).toBe("Contact");

        expect(find("#menuIcon")).toHaveFound(0);
      });
    });
  });
});
