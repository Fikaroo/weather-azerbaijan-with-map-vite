import { ActionTypes } from "./action-types";

export const setColor = (colors: string[] | undefined): ColorAction => {
  return { type: ActionTypes.SET_COLOR, payload: colors };
};
