import { createStore } from "redux";
import Vacation from "../models/Vacation";

// 1. Global state for Vacation
export class VacationState {
  public vacation: Vacation[] = [];
}

// 2. Action Type
export enum VacationActionType { // what types of actions do we want to enable on the data itself
  SetVacation = "SetVacation",
  DeleteVacation = "DeleteVacation",
  UpdateVacation = "UpdateVacation",
  AddVacation = "AddVacation",
  
}

// 3. Action Object
export type VacationPayload =
  | Vacation[]
  | Vacation
  | string
  | {
      vacations: Vacation[];
      total: number;
    };
export interface VacationAction {
  type: VacationActionType;
  payload: VacationPayload; // בעברית: מטען this is the specific data that is delivered with the action
}

// 4. Reducer ()
export function vacationReducer(
  currentState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState }; // this is called cloning - שיכפול

  // .....
  switch (action.type) {
    case VacationActionType.SetVacation: // payload here will be an array of Vacation: Vacation[]
      //@ts-ignore
      newState.vacation = action.payload.vacations as Vacation[];
      break;
    case VacationActionType.AddVacation: // payload here will be a single Vacation: Vacation
      const singleVacation = action.payload as Vacation;
      newState.vacation.push(singleVacation);
      break;
    case VacationActionType.DeleteVacation: // payload here will be Vacation id: number
      const vacationId = action.payload as string;
      const indexToDelete = newState.vacation.findIndex(
        (vacation) => vacation.id === vacationId
      );
      if (indexToDelete !== -1) newState.vacation.splice(indexToDelete, 1);
      break;
    case VacationActionType.UpdateVacation: // payload here will be a single Vacation: Vacation
      const vacationToUpdate = action.payload as Vacation;
      const indexToUpdate = newState.vacation.findIndex(
        (vacation) => vacation.id === vacationToUpdate.id
      );
      if (indexToUpdate !== -1)
        newState.vacation[indexToUpdate] = vacationToUpdate;
      break;
  }

  return newState;
}

// 5. store
export const vacationStore = createStore(vacationReducer);
