import express, { Router, Request, Response } from "express";
import Controller from "./interfaces/controller.interface";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export default class ContactController implements Controller {
  public path: string = '/contact';
  public router: Router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.post(this.path, this.postContact)
  }

  postContact = (req: Request, res: Response) => {
    const msg = {
      to: process.env.CONTACT_EMAIL, // Change to your recipient
      from: process.env.APP_EMAIL,
      replyTo: {
        name: req.body.fromName,
        email: req.body.fromEmail
      },
      subject: req.body.subject,
      text: 'Name: ' + req.body.fromName + '\nEmail: ' + req.body.fromEmail + '\nMessage: ' + req.body.message
    };
    sgMail.send(msg).then(() => {
      res.json({ status: 'Contact email sent!' });
    })
      .catch((error: any) => {
        /**{
            "message": "Forbidden",
            "code": 403,
            "body": {
                "errors": [
                  {
                    "message": "", 
                    "field": "from",
                    "help": null
                  }
                ]
              }
            }
          }*/
        res.json({ status: 'Error sending email.', message: error });
      });
  };
}