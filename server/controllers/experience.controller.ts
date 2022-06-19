import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import IExperienceService from "../services/interfaces/experiences.service.interface";

@autoInjectable()
export default class ExperienceController implements IController {
    public path: string = '/experiences';
    public router: Router = express.Router();

    constructor(@inject("IExperienceService")private experienceService?: IExperienceService) {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getExperiences)
    }

    getExperiences = (req: Request, res: Response) => {
        const experienceJson = this.experienceService?.getAll();
        return res.json(experienceJson);
    };
}