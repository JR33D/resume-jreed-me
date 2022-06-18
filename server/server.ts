import ContactController from './controllers/contact.controller';
import ExperienceController from './controllers/experience.controller';
import ProjectController from './controllers/project.controller';
import SkillController from './controllers/skill.controller';
import App from './app';

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