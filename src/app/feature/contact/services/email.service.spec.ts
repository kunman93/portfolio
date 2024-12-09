import { Shallow } from "shallow-render";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ContactModule } from "../contact.module";
import { EmailService } from "./email.service";
import { Sender } from "../models/sender";

describe('EmailService', () => {
    let shallow: Shallow<EmailService>;

    beforeEach(() => {
        shallow = new Shallow(EmailService, ContactModule);
    });

    describe('sendEmail', async () => {
        it('sends an email with emailjs', async () => {
            // arrange
            const { instance } = shallow.createService();

            const emailJSResponseStatus: EmailJSResponseStatus = {
                status: 200, 
                text: 'OK'
            };
            const emailJsSpy = spyOn(emailjs, 'send').and.returnValue(Promise.resolve(emailJSResponseStatus));

            const sender: Sender = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                message: 'Hello, this is a test message.'
            };

            const expectedEmailJsData = {
                from_name: sender.name,
                from_email: sender.email,
                message: sender.message
            };

            // act
            instance.sendEmail(sender);

            // assert
            expect(emailJsSpy).toHaveBeenCalledOnceWith(
                jasmine.any(String), // The service ID from EMAILJS_CONFIG
                jasmine.any(String), // The template ID from EMAILJS_CONFIG
                expectedEmailJsData // The data passed to emailjs.send
            );
        });
    });
});