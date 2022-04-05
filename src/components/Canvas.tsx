import React, {useRef} from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {debounce} from "lodash";
import {changeColor, changeDrawing} from "../store/actionCreaters";

import "./Canvas.scss";
import ColorPicker from "./ColorPicker";


const QuizCanvas = styled.canvas`
  border: 1px solid #000;
  background-color: #eee;
`;
const Header = styled.header`
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const NowColorDiv = styled.div`
  border: 1px solid #000;
  margin-left: 10px;
  width: 30px;
  height: 30px;
`;
const ToolsDiv = styled.div`
  padding: 10px;
  border: 1px solid #000;
  & > i {
    margin: 2px;
  }
`;
const ResultDiv = styled.div`
  padding: 10px;
  border: 1px solid #000;
`;
const ResultImg = styled.img`
  width: 100%;
  height: 100%;
`;

let prevPath = { x: -1, y: -1 };
const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundCanvasRef = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const color = useSelector((state) => state.canvas.color);
    const drawingMode = useSelector((state) => state.canvas.drawing);
    const [fileImage, setFilImage] = useState("");
    const [canvasWh, setcanvasWh] = useState({width: 0, height: 0});
    
    const onColor = (color: string) => {
      changeColor(color)(dispatch);
    };
    const upHandler = () => {
      changeDrawing(false)(dispatch);
      prevPath.x = -1;
      prevPath.y = -1;
    }
    const downHandler = () => {
      changeDrawing(true)(dispatch);
    }
    const moveHandler = (e:any) => {
      if (!canvasRef.current) {
        return;
      }
      const x: number =
        e.nativeEvent.offsetX !== undefined
          ? e.nativeEvent.offsetX
          : e.nativeEvent.changedTouches[0]?.clientX -
            canvasRef.current.getBoundingClientRect().left;
      const y: number =
        e.nativeEvent.offsetY !== undefined ? e.nativeEvent.offsetY : e.nativeEvent.changedTouches[0]?.clientY -
          canvasRef.current.getBoundingClientRect().top;
      if (!drawingMode) return;
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        if (color !== "erase") {
          if (prevPath.x !== -1) {
              context.beginPath();
              context.lineWidth = 4;
              context.strokeStyle = color;
              context.moveTo(prevPath.x, prevPath.y);
              context.lineTo(x, y);
              context.stroke();
              context.closePath();
          }
            prevPath.x = x;
            prevPath.y = y;
          } else {
            context.clearRect(x - 20, y - 20, 20, 20);
          }
      }
    };
    const resetHandler = () => {
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvasWh.width, canvasWh.height);
        context.beginPath();
      }
    }

    const saveImg = () => {
      const srcCanvas = canvasRef.current;
      if (srcCanvas){
          const destinationCanvas = document.createElement("canvas");
          destinationCanvas.width = srcCanvas.width;
          destinationCanvas.height = srcCanvas.height;

          const destCtx = destinationCanvas.getContext("2d");
          if (destCtx) {
            destCtx.fillStyle = "#FFFFFF";
            destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);
            destCtx.drawImage(srcCanvas, 0, 0);

            const fullQuality = destinationCanvas.toDataURL("image/jpeg", 1.0);
            if (fullQuality) setFilImage(fullQuality);
          }
      } 
    }

    const handleResize = debounce(() => {
      setcanvasWh({
        width: Math.floor(window.innerWidth / 1.2 - 25),
        height: Math.floor(window.innerHeight / 1.8 - 25),
      });
    }, 500)

    useEffect(() => {
      return () => URL.revokeObjectURL(fileImage);
    }, [fileImage]);

    useEffect(() => {
      setcanvasWh({
        width: window.innerWidth / 1.2 - 25,
        height: window.innerHeight / 1.8 - 25,
      });
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div className="canvas" style={{ width: canvasWh.width }}>
        <Header>
          <h1>Draw</h1>
          <div>
            color:
            {color === "erase" ? (
              <i className="fas fa-eraser icon"></i>
            ) : (
              <NowColorDiv style={{ backgroundColor: color }}></NowColorDiv>
            )}
          </div>
        </Header>
        <QuizCanvas
          width={canvasWh.width}
          height={canvasWh.height}
          ref={canvasRef}
          onMouseUp={upHandler}
          onMouseDown={downHandler}
          onMouseMove={moveHandler}
          onTouchStart={downHandler}
          onTouchEnd={upHandler}
          onTouchMove={moveHandler}
        ></QuizCanvas>
        <ColorPicker style={{ border: "1px solid #000" }} />
        <ToolsDiv>
          <i
            className="fas fa-eraser icon"
            onClick={() => {
              onColor("erase");
            }}
          ></i>
          <i
            className="fas fa-undo icon"
            onClick={() => {
              resetHandler();
            }}
          ></i>
          <i onClick={saveImg} className="fas fa-save icon" />
        </ToolsDiv>
        <ResultDiv style={{ height: canvasWh.height }}>
          {fileImage ? (
            <ResultImg
              ref={backgroundCanvasRef}
              src={fileImage}
              alt="fileImage"
            />
          ) : (
            ""
          )}
        </ResultDiv>
      </div>
    );
}
 
export default Canvas;