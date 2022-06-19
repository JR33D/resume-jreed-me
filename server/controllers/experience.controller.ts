import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import IExperienceService from "../services/interfaces/experience.service.interface";
import ExperienceService from "../services/experience.service";

@autoInjectable()
export default class ExperienceController implements IController {
    public path: string = '/experiences';
    public router: Router = express.Router();
    private experienceService?: ExperienceService;

    constructor(@inject("IExperienceService")experienceService?: IExperienceService) {
        this.experienceService = experienceService;
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