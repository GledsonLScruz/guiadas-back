import { EvaluationCreationAttributes, EvaluationAttributes } from '../models/evaluation'
import { EvaluationRepository } from '../repository/evaluationRepository'
import { CriteriaService } from './criteriaService'

export class EvaluationService {

  evaluationRepository: EvaluationRepository
  criteriaService!: CriteriaService

  constructor(evaluationRepository: EvaluationRepository) {
    this.evaluationRepository = evaluationRepository
    this.criteriaService = this.criteriaService
  }

  async createEvaluation(evaluationData: EvaluationCreationAttributes) {
    const evaluation = await this.evaluationRepository.createEvaluation(evaluationData)
    return evaluation
  }

  async getEvaluationById(id: number) {
    const evaluation = await this.evaluationRepository.getEvaluationById(id)
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
    if (result != null){
      await this.criteriaService.cascadingCriteriaDeletion(result['id']);
    }
    
    return result
  }
}
