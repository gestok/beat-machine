import { useContext } from "react";
import styled from "styled-components";
import Context from "./Context";
import { AiOutlinePause } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";

const PlayPause = () => {
  const { power, playing, setPlaying } = useContext(Context);

  return (
    <Button
      tabIndex={-1}
      className={playing && "active"}
      onClick={() => power && setPlaying(playing ? false : true)}
    >
      <BsPlayFill />
      <AiOutlinePause />
    </Button>
  );
};
export default PlayPause;

const Button = styled.button`
  padding: 0;
  margin: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: solid 2px var(--c-power-off);
  border-radius: var(--g-radius);
  background: var(--c-label);
  color: var(--c-power-off);
  box-shadow: var(--s-pad);
  width: 45px;
  height: 45px;
  align-self: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: translate(0px, 2px);
    border-bottom: solid 2px transparent;
    box-shadow: 0px 2px 1px 0px var(--c-knob) inset,
      0px 0px 0px 0px var(--c-tertiary) inset, 0px 0px 0px #0005;
  }
  &.active {
    box-shadow: 0px 0px 10px 0px #66706f inset,
      0px 0px 4px 3px var(--c-tertiary) inset, var(--s-pad);
    color: var(--c-tertiary);
  }
`;
