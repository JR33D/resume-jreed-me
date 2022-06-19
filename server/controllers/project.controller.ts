import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import IProjectService from "../services/interfaces/projects.service.interface";

@autoInjectable()
export default class ProjectController implements IController {
    public path: string = '/projects';
    public router: Router = express.Router();

    constructor(@inject("IProjectService")private projectService?: IProjectService) {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getProjects)
    }

    getProjects = (req: Request, res: Response) => {
        const projectsJson = this.projectService?.getAll();
        return res.json(projectsJson);
    };
}