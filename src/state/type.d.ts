type ColorAction = {
  type: string;
  payload: string[] | undefined;
};

type DispatchType = (arg: ColorAction) => ColorAction;
