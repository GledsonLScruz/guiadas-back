
import { CriteriaRepository } from "../repository/criteriaRepository";

const criteriaRepo = new CriteriaRepository();

export const createCriteria = async (
  grade: number,
  comment: string,
  name: string,
  evaluationId: number
) => {
  const criteria = await criteriaRepo.createCriteria(grade, comment, name, evaluationId);
  return criteria;
};

export const getAllCriteria = async () => {
  const criteriaList = await criteriaRepo.getAllCriteria();
  return criteriaList;
};

export const updateCriteria = async (
  id: number,
  grade: number,
  comment: string,
  name: string,
  evaluationId: number
) => {
  const updatedCriteria = await criteriaRepo.updateCriteria(id, grade, comment, name, evaluationId);
  return updatedCriteria;
};

export const deleteCriteria = async (id: number) => {
  const result = await criteriaRepo.deleteCriteria(id);
  return result;
};
