import express, { Router, Request, Response } from "express";
import Controller from "./interfaces/controller.interface";
import projectsJson from "../data/projects.json";

export default class ProjectController implements Controller {
    public path: string = '/projects';
    public router: Router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes(): void {
        this.router.get(this.path, this.getProjects)
    }

    getProjects = (req: Request, res: Response) => {
        return res.json(projectsJson);
    };
}