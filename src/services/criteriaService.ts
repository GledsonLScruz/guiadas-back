import { CriteriaRepository } from "../repository/criteriaRepository";

export class CriteriaService {
  criteriaRepository: CriteriaRepository;

  constructor(criteriaRepository: CriteriaRepository) {
    this.criteriaRepository = criteriaRepository;
  }

  async createCriteria(grade: number, comment: string, name: string, evaluationId: number) {
    return await this.criteriaRepository.createCriteria(grade, comment, name, evaluationId);
  }

  async getAllCriteria() {
    return await this.criteriaRepository.getAllCriteria();
  }

  async updateCriteria(id: number, grade: number, comment: string, name: string, evaluationId: number) {
    return await this.criteriaRepository.updateCriteria(id, grade, comment, name, evaluationId);
  }

  async deleteCriteria(id: number) {
    return await this.criteriaRepository.deleteCriteria(id);
  }

  async cascadingCriteriaDeletion(evaluationId: number){
    return await this.deleteCriteria(evaluationId);
  }

  async getCriteriaById(id: number) {
    return await this.criteriaRepository.getCriteriaById(id);
  }
}
