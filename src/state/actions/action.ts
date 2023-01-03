import { ActionTypes } from "./action-types";

export const setColor = (color: string): ColorAction => {
  return { type: ActionTypes.SET_COLOR, payload: color };
};
