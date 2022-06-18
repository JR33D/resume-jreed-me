import express, { Router, Request, Response } from "express";
import Controller from "./interfaces/controller.interface";
import skillJson from "../data/skills.json";

export default class SkillController implements Controller {
    public path: string = '/skills';
    public router: Router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getSkills)
    }

    getSkills = (req: Request, res: Response) => {
        return res.json(skillJson);
    };
}