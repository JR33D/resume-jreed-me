import { injectable } from "tsyringe";
import ISkillService from "./interfaces/skills.service.interface";
import skillJson from "../data/skills.json";

@injectable()
export default class SkillService implements ISkillService{
    getAll() : any {
        return skillJson;
    }
}