import { Action } from "../actions";
import { CanvasType } from "../actionTypes";
import {produce} from "immer";

const initialState = {
  color: "black",
  drawing: false,
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case CanvasType.CHANGE_COLOR:
        return produce(state, (draft) => {
          draft.color = action.payload.color;
        });
      case CanvasType.CHANGE_DRAWING:
        return produce(state, (draft) => {
          draft.drawing = action.payload.drawing;
        });
      default:
        return state;
    }
}

export default reducer;