import { Block } from "@/types/block";

export const validateDateRange = (
  initialDate: string,
  finalDate: string
): string | null => {
  const newStart = new Date(initialDate).getTime();
  const newEnd = new Date(finalDate).getTime();
  if (newStart >= newEnd) {
    return "La fecha inicial no puede ser mayor o igual que la final.";
  }
  return null;
};

export const validateAgainstCurrentDate = (
  initialDate: string,
): string | null => {
  const newStart = new Date(initialDate).getTime();
  const now = new Date().getTime();
  if (newStart < now) {
    return "La fecha inicial no puede ser menor que la fecha actual.";
  }
  return null;
};

export const isOverlap = (
  newInitial: string,
  newFinal: string,
  existingInitial: string,
  existingFinal: string
): boolean => {
  const newStart = new Date(newInitial).getTime();
  const newEnd = new Date(newFinal).getTime();
  const existingStart = new Date(existingInitial).getTime();
  const existingEnd = new Date(existingFinal).getTime();
  // Se solapan si newStart < existingEnd && existingStart < newEnd
  return newStart < existingEnd && existingStart < newEnd;
};


export const validateNoOverlap = (
  newInitial: string,
  newFinal: string,
  blocks: Block[]
): string | null => {
  for (const block of blocks) {
    if (isOverlap(newInitial, newFinal, block.initialDate, block.finalDate)) {
      return "El rango de fechas se solapa con otro bloque existente.";
    }
  }
  return null;
};