import express, { Router, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IController from "./interfaces/controller.interface";
import IProjectService from "../services/interfaces/project.service.interface";
import ProjectService from "../services/project.service";

@autoInjectable()
export default class ProjectController implements IController {
    public path: string = '/projects';
    public router: Router = express.Router();
    private projectService?: ProjectService;

    constructor(@inject("IProjectService")projectService?: IProjectService) {
        this.projectService = projectService;
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