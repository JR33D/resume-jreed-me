import "reflect-metadata"
import chai, { expect } from "chai";
import sinon from "sinon";
import { mockReq, mockRes } from 'sinon-express-mock'
import sinonChai from "sinon-chai";
chai.use(sinonChai);

import ProjectController from '../../../controllers/Project.controller';
import ProjectService from '../../../services/Projects.service';

describe('Project Controller', () => {
    const Projects = [
        { id: 1, image: "image.png", title: "Project One", link: "https://google.com", description: "A Description" },
        { id: 2, image: "image.png", title: "Project Two", link: "https://stackoverflow.com", description: "A Description" }
    ];
    let controller: ProjectController;
    const mockProjectService = sinon.createStubInstance(ProjectService, {
        getAll: Projects
    });
    beforeEach(() => {
        controller = new ProjectController(mockProjectService);
    });

    it('should make call to service to get all Projects', () => {
        const request = {};
          const req = mockReq(request);
          const res = mockRes();
        const actual = controller.getProjects(req, res);
        expect(mockProjectService.getAll).to.have.been.called;
        expect(res.json).to.have.been.calledWith(Projects);
    });
});
