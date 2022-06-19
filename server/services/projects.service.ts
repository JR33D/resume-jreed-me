import { injectable } from "tsyringe";
import IProjectService from "./interfaces/projects.service.interface";
import projectsJson from "../data/projects.json";

@injectable()
export default class ProjectService implements IProjectService {
    getAll() : any {
        return projectsJson;
    }
}