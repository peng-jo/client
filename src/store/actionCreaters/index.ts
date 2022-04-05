import { Action } from "../actions";
import { CanvasType } from "../actionTypes";
import { Dispatch } from "redux";

//액션 생성 함수
export const changeColor = (color: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CanvasType.CHANGE_COLOR,
      payload: {color},
    });
  }
};

export const changeDrawing = (drawing: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CanvasType.CHANGE_DRAWING,
      payload: { drawing: drawing },
    });
  };
};