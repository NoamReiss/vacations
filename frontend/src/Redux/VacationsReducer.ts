import Vacation from "../Components/Models/Vacation";

//initial state
export class VacationState {
  public allVacations: Vacation[] = [];
}

//what action i will use...
export enum VacationActionType {
  addVacation = "addVacation",
  deleteVacation = "deleteVacation",
  updatedVacation = "updatedVacation",
  getVacation = "getVacation",
  allVacations = "allVacations",
}

//action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action

export const allVacationAction = (allVacations: Vacation[]): VacationAction => {
  return { type: VacationActionType.allVacations, payload: allVacations };
};

export const addVacationAction = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const deleteVacationAction = (vacation_code: number): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: vacation_code };
};

export const updatedVacationAction = (Vacation: Vacation): VacationAction => {
  return { type: VacationActionType.updatedVacation, payload: Vacation };
};

export const getVacationAction = (vacation_code: number): VacationAction => {
  return { type: VacationActionType.getVacation, payload: vacation_code };
};

//this is the reducer function, but since it's manged only by redux, we built the function above
export function VacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.addVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.allVacations = [...newState.allVacations].filter(
        (item) => item.vacation_code !== action.payload
      );
      break;
    case VacationActionType.updatedVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.getVacation:
      newState.allVacations = newState.allVacations.filter(
        (item) => item.vacation_code === action.payload
      );
      break;
    case VacationActionType.allVacations:
      newState.allVacations = action.payload;
      break;
  }

  return newState;
}
