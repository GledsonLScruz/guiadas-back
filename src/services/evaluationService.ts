import { EvaluationCreationAttributes, EvaluationAttributes } from '../models/evaluation'
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
    // grade, comment, name , evalid
    this.criteriaService.createCriteria(evaluationData.didacticGrade,evaluationData.didacticComment,criteriaTypes.DIDACTIC,evaluation.dataValues.id); // Didactic
    this.criteriaService.createCriteria(evaluationData.evalGrade,evaluationData.evalComment,criteriaTypes.DIDACTIC,evaluation.dataValues.id); // Evaluation methods
    this.criteriaService.createCriteria(evaluationData.materialGrade,evaluationData.materialComment,criteriaTypes.DIDACTIC,evaluation.dataValues.id); // Bibliography
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
