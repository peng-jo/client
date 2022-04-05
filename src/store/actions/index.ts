import {CanvasType} from "../actionTypes"

interface ChangeColorAction {
  type: CanvasType.CHANGE_COLOR;
  payload: { color: string };
};

interface ChangeDrawingAction {
  type: CanvasType.CHANGE_DRAWING;
  payload: { drawing: boolean };
};

export type Action = ChangeColorAction | ChangeDrawingAction;