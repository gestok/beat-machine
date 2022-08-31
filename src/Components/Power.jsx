import styled from "styled-components";
import Context from "./Context";
import { useContext } from "react";
import gravel from '../Assets/gravel.png';

const Power = () => {
  const { power, setPower, setPlaying } = useContext(Context);

  const powerOff = () => {
    setPower(false);
    setPlaying(false);
  };

  const powerOn = () => {
    setPower(true);
  };

  return (
    <PowerWrapper>
      <PowerTitle className={power && "on"}>POWER</PowerTitle>
      <PowerButton
        className={power && "on"}
        onClick={() => (power ? powerOff() : powerOn())}
        texture={gravel}
      >
        <Knob className={power && "on"} />
      </PowerButton>
    </PowerWrapper>
  );
};
export default Power;

const PowerWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: var(--g-gap-xs);
  margin-right: auto;
`;

const PowerTitle = styled.div`
  color: var(--c-label);
  user-select: none;
  pointer-events: none;
  transition: all 0.3s ease;
  &.on {
    color: var(--c-tertiary);
  }
`;

const PowerButton = styled.div`
  position: relative;
  background: var(--c-power-off);
  background-blend-mode: multiply;
  height: 20px;
  width: 40px;
  cursor: pointer;
  user-select: none;
  border-radius: var(--g-radius);
  border-top: solid 2px var(--c-knob);
  border-left: solid 1px var(--c-knob);
  border-right: solid 1px var(--c-power-off);
  border-bottom: solid 1px var(--c-power-off);
  box-shadow: var(--s-knob);
  transition: all 0.3s ease;

  &.on {
    background: linear-gradient(45deg, var(--c-secondary), var(--c-secondary)), url(${props => props.texture});
  }
`;

const Knob = styled.span`
  position: absolute;
  left: 2px;
  top: 1px;
  height: calc(100% - 2px);
  width: calc(50% - 2px);
  background: var(--c-knob);
  border-radius: var(--g-radius);
  transition: all 0.3s ease;

  &.on {
    left: calc(50% + 0px);
  }
`;
