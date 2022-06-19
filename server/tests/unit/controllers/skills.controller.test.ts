import "reflect-metadata"
import chai, { expect } from "chai";
import sinon from "sinon";
import { mockReq, mockRes } from 'sinon-express-mock'
import sinonChai from "sinon-chai";
chai.use(sinonChai);

import SkillController from '../../../controllers/skill.controller';
import SkillService from '../../../services/skills.service';

describe('Skill Controller', () => {
    const skills = [{ id: 1, title: "Skill One", percentage: "100%" }, { id: 2, title: "Skill Two", percentage: "0%" }];
    let controller: SkillController;
    const mockSkillService = sinon.createStubInstance(SkillService, {
        getAll: skills
    });
    beforeEach(() => {
        controller = new SkillController(mockSkillService);
    });

    it('should make call to service to get all skills', () => {
        const request = {};
          const req = mockReq(request);
          const res = mockRes();
        const actual = controller.getSkills(req, res);
        expect(mockSkillService.getAll).to.have.been.called;
        expect(res.json).to.have.been.calledWith(skills);
    });
});
