import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../store/actionCreaters";

const Button = styled.input`
  height: 50px;
  width: 50px;
`;

const colors = [
  "#000000",
  "#fe0000",
  "#ee1010",
  "#de2020",
  "#cf3030",
  "#bf4040",
  "#af5050",
  "#fea000",
  "#ee9c10",
  "#de9820",
  "#cf9430",
  "#bf9040",
  "#af8c50",
  "#fed800",
  "#eecd10",
  "#dec220",
  "#cfb730",
  "#bfac40",
  "#afa150",
  "#00fe3e",
  "#10ee46",
  "#20de4e",
  "#30cf57",
  "#40bf5f",
  "#50af67",
  "#006bfe",
  "#106eee",
  "#2070de",
  "#3073cf",
  "#4075bf",
  "#5078af",
  "#8700fe",
  "#8610ee",
  "#8520de",
  "#8430cf",
  "#8340bf",
  "#8250af",
  "#ffffff",
];

type Props = {
  style?: React.CSSProperties;
}

const ColorPicker: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const onColor = (color: string) => {
    changeColor(color)(dispatch);
  };

  return (
    <div className="colorpicker" style={props.style}>
      <div className="pickerContainer">
        {colors.map((color, index) => (
          <Button
            key={color}
            style={{ backgroundColor: color }}
            type="button"
            onClick={() => {
              onColor(color);
            }}
          />
        ))}
      </div>
    </div>
  );
};
 
export default ColorPicker;