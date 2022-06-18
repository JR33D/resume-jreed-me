import express, { Router, Request, Response } from "express";
import Controller from "./interfaces/controller.interface";
import experienceJson from "../data/experiences.json";

export default class ExperienceController implements Controller {
    public path: string = '/experiences';
    public router: Router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getExperiences)
    }

    getExperiences = (req: Request, res: Response) => {
        return res.json(experienceJson);
    };
}