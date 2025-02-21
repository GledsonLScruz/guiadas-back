
import evaluationRepository from '../repository/evaluationRepository'
import { EvaluationCreationAttributes, EvaluationAttributes } from '../models/evaluation'

export const createEvaluation = async (
  evaluationData: EvaluationCreationAttributes
) => {
  const evaluation = await evaluationRepository.createEvaluation(evaluationData)
  return evaluation
}

export const getEvaluationById = async (id: number) => {
  const evaluation = await evaluationRepository.getEvaluationById(id)
  return evaluation
}

export const getAllEvaluations = async () => {
  const evaluations = await evaluationRepository.getAllEvaluations()
  return evaluations
}

export const updateEvaluation = async (
  id: number,
  evaluationData: Partial<EvaluationAttributes>
) => {
  const updatedEvaluation = await evaluationRepository.updateEvaluation(id, evaluationData)
  return updatedEvaluation
}

export const deleteEvaluation = async (id: number) => {
  const result = await evaluationRepository.deleteEvaluation(id)
  return result
}
