import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Sender } from "../models/sender";
import { Injectable } from '@angular/core';
import { EmailJsData } from '../models/email-js-data';
import { EMAILJS_CONFIG } from 'src/app/configs/emailjs.config';

@Injectable({ providedIn: 'root' })
export class EmailService {
    constructor() {
        emailjs.init({
            publicKey: EMAILJS_CONFIG.publicKey
        });
    }

    sendEmail(sender: Sender): Promise<EmailJSResponseStatus> {
        const emailJsData: EmailJsData = {
            from_name: sender.name,
            from_email: sender.email,
            message: sender.message
        };

        return emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            emailJsData
        );
    }
}