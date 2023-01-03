import { ActionTypes } from "../actions/action-types";

interface IColorState {
  colors: string[];
}

const initialState: IColorState = {
  colors: [],
};

type ActionType = ColorAction;

const colorReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SET_COLOR:
      return { ...state, colors: action.payload };
    default:
      return state;
  }
};

export default colorReducer;
