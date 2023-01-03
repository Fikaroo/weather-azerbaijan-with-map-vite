type ColorAction = {
  type: string;
  payload: string[];
};

type DispatchType = (arg: ColorAction) => ColorAction;
