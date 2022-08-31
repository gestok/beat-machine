import styled from "styled-components";
import { useContext } from "react";
import Context from "./Context";
import gravel from '../Assets/gravel.png';

const OptionSlider = ({
  title,
  min,
  max,
  step = 1,
  stateValue,
  setStateValue,
  pseudo,
}) => {
  const { power } = useContext(Context);

  return (
    <Wrapper>
      <Title className={power && "on"}>
        {title}
        <Value power={power} pseudo={pseudo && pseudo}>
          {power && stateValue}
        </Value>
      </Title>
      <Slider
        className={power && "on"}
        type="range"
        min={min}
        max={max}
        step={step}
        value={stateValue}
        onChange={(e) => setStateValue(e.target.value)}
        texture={gravel}
      />
    </Wrapper>
  );
};
export default OptionSlider;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: var(--g-gap-xs);
  margin-right: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: var(--g-gap-xs);
  color: var(--c-label);
  user-select: none;
  pointer-events: none;
  transition: all 0.3s ease;
  &.on {
    color: var(--c-tertiary);
  }
`;

const Value = styled.div`
  position: relative;
  display: flex;
  padding-top: 2px;
  width: 50px;
  height: 15px;
  justify-content: center;
  align-items: center;
  background: var(--c-power-off);
  color: var(--c-tertiary);
  border-top: solid 1px var(--c-knob);
  border-left: solid 1px var(--c-knob);
  border-radius: var(--g-radius);
  box-shadow: var(--s-knob);
  font-size: 80%;
  line-height: 0;

  ::after {
    content: "${(props) => props.power && props.pseudo}";
    padding-left: 2px;
    font-size: 10px;
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;
  outline: none;
  position: relative;
  background: var(--c-power-off);
  background-blend-mode: multiply;
  padding: 0 2px;
  height: 20px;
  width: 120px;
  user-select: none;
  border-radius: var(--g-radius);
  border-top: solid 2px var(--c-knob);
  border-left: solid 1px var(--c-knob);
  border-right: solid 1px var(--c-power-off);
  border-bottom: solid 1px var(--c-power-off);
  box-shadow: var(--s-knob);
  pointer-events: none;
  transition: all 0.3s ease;

  &.on {
    background: linear-gradient(45deg, var(--c-secondary), var(--c-secondary)), url(${props => props.texture});
    pointer-events: auto;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: var(--c-knob);
    border-radius: var(--g-radius);
    cursor: pointer;
  }

  ::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: var(--c-knob);
    border-radius: var(--g-radius);
    cursor: pointer;
  }
`;
