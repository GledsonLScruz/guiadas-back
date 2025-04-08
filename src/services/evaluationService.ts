import { EvaluationCreationAttributes, EvaluationAttributes, Evaluation } from '../models/evaluation'
import { EvaluationRepository } from '../repository/evaluationRepository'
import { CriteriaService } from './criteriaService'
import { criteriaTypes } from '../models/criteriaTypes'

export class EvaluationService {

  evaluationRepository: EvaluationRepository
  criteriaService!: CriteriaService

  constructor(evaluationRepository: EvaluationRepository) {
    this.evaluationRepository = evaluationRepository
  }

  async createEvaluation(evaluationData: EvaluationCreationAttributes) {
    const evaluation = await this.evaluationRepository.createEvaluation(evaluationData)
    return evaluation
  }

  async getEvaluationById(id: number) {
    const evaluation = await this.evaluationRepository.getEvaluationById(id)
    return evaluation
  }

  async getEvaluationByProfessorAndClass(professorId: number, classId: number) {
    const evaluation = await this.evaluationRepository.getEvaluationByProfessorAndClass(professorId, classId)
    return evaluation
  }


  async getAllEvaluations() {
    const evaluations = await this.evaluationRepository.getAllEvaluations()
    return evaluations
  }

  async updateEvaluation(id: number, evaluationData: Partial<EvaluationAttributes>) {
    const updatedEvaluation = await this.evaluationRepository.updateEvaluation(id, evaluationData)
    return updatedEvaluation
  }

  async deleteEvaluation(id: number) {
    const result = await this.evaluationRepository.deleteEvaluation(id)
    if (result != null) {
      await this.criteriaService.cascadingCriteriaDeletion(result['id']);
    }

    return result
  }
}
