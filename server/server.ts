import "reflect-metadata";
import {container} from "tsyringe";

import ContactController from './controllers/contact.controller';
import ExperienceController from './controllers/experience.controller';
import ProjectController from './controllers/project.controller';
import SkillController from './controllers/skill.controller';
import ProjectService from "./services/project.service";
import ExperienceService from "./services/experience.service";
import SkillService from "./services/skill.service";

import App from './app';


container.register("ISkillService", { useClass: SkillService }).resolve(SkillController);
container.register("IProjectService", { useClass: ProjectService }).resolve(ProjectController);
container.register("IExperienceService", { useClass: ExperienceService }).resolve(ExperienceController);

const envPort = parseInt(process.env.SERVER_APP_PORT || '');
const PORT = Number.isInteger(envPort) ? envPort : 3001; 

const app = new App(
  [
    new ContactController(),
    new ExperienceController(),
    new ProjectController(),
    new SkillController()
  ],
  PORT
);
 
app.listen();