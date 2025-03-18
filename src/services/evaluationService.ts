import { EvaluationCreationAttributes, EvaluationAttributes } from '../models/evaluation'
import { EvaluationRepository } from '../repository/evaluationRepository'

export class EvaluationService {

  evaluationRepository: EvaluationRepository

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
    return result
  }
}
