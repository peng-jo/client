import {combineReducers} from "redux";
import canvas from "./CanvasReducer";

const reducers = combineReducers({
  canvas,
});
export default reducers;
export type AppState = ReturnType<typeof reducers>;