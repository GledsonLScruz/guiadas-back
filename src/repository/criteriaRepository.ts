
import { Criteria } from "../models/criteria";

export class CriteriaRepository {
  async createCriteria(
    grade: number,
    comment: string,
    name: string,
    evaluationId: number
  ) {
    return await Criteria.create({
      grade,
      comment,
      name,
      evaluationId
    });
  }

  async getAllCriteria() {
    return await Criteria.findAll();
  }

  async updateCriteria(
    id: number,
    grade: number,
    comment: string,
    name: string,
    evaluationId: number
  ) {
    return await Criteria.update(
      { grade, comment, name, evaluationId },
      { where: { id } }
    );
  }

  async deleteCriteria(id: number) {
    return await Criteria.destroy({ where: { id } });
  }

  async getCriteriaById(id: number) {
    return await Criteria.findByPk(id);
  }

}
