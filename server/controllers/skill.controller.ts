import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import ISkillService from "../services/interfaces/skills.service.interface";

@autoInjectable()
export default class SkillController implements IController {
    public path: string = '/skills';
    public router: Router = express.Router();

    constructor(@inject("ISkillService") private skillService?: ISkillService) {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getSkills)
    }

    getSkills(req: Request, res: Response) {
        const skillJson = this.skillService?.getAll();
        return res.json(skillJson);
    };
}