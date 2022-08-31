import styled from "styled-components";
import { useContext } from "react";
import Context from "./Context";

const Display = () => {
  const {soundname} = useContext(Context);

  return (
    <DisplayScreen>{soundname}</DisplayScreen>
  );
}
export default Display;


const DisplayScreen = styled.div`
  font-size: 24px;
  min-width: 70px;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1 / 4;
  background: #00000020;
  color: #FFFFFF75;
  padding: var(--g-gap-sm);
  box-shadow: rgb(0 0 0 / 27%) 0px 2px 20px inset;
  border-radius: 10px;
`;