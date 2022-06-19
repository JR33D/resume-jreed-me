import { injectable } from "tsyringe";
import IExperienceService from "./interfaces/experience.service.interface";
import experienceJson from "../data/experiences.json";

@injectable()
export default class ExperienceService implements IExperienceService {
    getAll() : any {
        return experienceJson;
    }
}