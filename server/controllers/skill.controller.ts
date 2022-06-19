import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import ISkillService from "../services/interfaces/skill.service.interface";
import SkillService from "../services/skill.service";

@autoInjectable()
export default class SkillController implements IController {
    public path: string = '/skills';
    public router: Router = express.Router();
    private skillService?: SkillService;

    constructor(@inject("ISkillService")skillService?: ISkillService) {
        this.skillService = skillService;
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getSkills)
    }

    getSkills = (req: Request, res: Response) => {
        const skillJson = this.skillService?.getAll();
        return res.json(skillJson);
    };
}