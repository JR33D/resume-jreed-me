import "reflect-metadata"
import chai, { expect } from "chai";
import sinon from "sinon";
import { mockReq, mockRes } from 'sinon-express-mock'
import sinonChai from "sinon-chai";
chai.use(sinonChai);

import ExperienceService from "../../../services/experience.service";
import ExperienceController from "../../../controllers/experience.controller";


describe('Experience Controller', () => {
    const Experiences = [
        { id: 1, title: "Position Title", company: "Position Company", description: "Position Description", startDate: "02/2020" },
        { id: 1, title: "Position Title", company: "Position Company", description: "Position Description", startDate: "01/2019", endDate: "01/2020" }
    ];
    let controller: ExperienceController;
    const mockExperienceService = sinon.createStubInstance(ExperienceService, {
        getAll: Experiences
    });
    beforeEach(() => {
        controller = new ExperienceController(mockExperienceService);
    });

    it('should make call to service to get all Experiences', () => {
        const request = {};
          const req = mockReq(request);
          const res = mockRes();
        const actual = controller.getExperiences(req, res);
        expect(mockExperienceService.getAll).to.have.been.called;
        expect(res.json).to.have.been.calledWith(Experiences);
    });
});
