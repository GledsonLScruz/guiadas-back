
import { Evaluation, EvaluationCreationAttributes, EvaluationAttributes } from '../models/evaluation'

export class EvaluationRepository {
  async createEvaluation(evaluationData: EvaluationCreationAttributes) {
    return await Evaluation.create(evaluationData)
  }

  async getEvaluationById(id: number) {
    return await Evaluation.findByPk(id)
  }

  async getAllEvaluations() {
    return await Evaluation.findAll()
  }

  async updateEvaluation(id: number, evaluationData: Partial<EvaluationAttributes>) {
    const evaluation = await Evaluation.findByPk(id)
    if (!evaluation) {
      return null
    }
    return await evaluation.update(evaluationData)
  }

  async deleteEvaluation(id: number) {
    const evaluation = await Evaluation.findByPk(id)
    if (!evaluation) {
      return null
    }
    return await evaluation.destroy()
  }
}

