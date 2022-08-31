import { useContext } from "react";
import styled from "styled-components";
import Context from "./Context";
import gravel from '../Assets/gravel.png';

const Stepsize = () => {
  const { power, step, setStep } = useContext(Context);

  return (
    <Wrapper>
      <Title className={power && 'on'}>
        STEP
        <Value power={power}>
          {power && "1/"+step}
        </Value>
      </Title>
      <RadioWrapper className={power && "on"} texture={gravel} >
        <Radio tabIndex={-1} className={step === 4 ? "active" : ""} type="radio" name="stepsize" onChange={ (e) => setStep(4) } />
        <Radio tabIndex={-1} className={step === 8 ? "active" : ""} type="radio" name="stepsize" onChange={ (e) => setStep(8) } />
        <Radio tabIndex={-1} className={step === 16 ? "active" : ""} type="radio" name="stepsize" onChange={ (e) => setStep(16) } />
        <Radio tabIndex={-1} className={step === 32 ? "active" : ""} type="radio" name="stepsize" onChange={ (e) => setStep(32) } />
      </RadioWrapper>
    </Wrapper>
  );
};
export default Stepsize;

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

const RadioWrapper = styled.div`
  pointer-events: none;
  display: flex;
  gap: var(--g-gap-xs);
  & input {
    background: var(--c-power-off);
    background-blend-mode: multiply;
  }
  &.on {
    pointer-events: auto;
  }
  &.on input {
    background: linear-gradient(0deg, var(--c-secondary), var(--c-secondary)), url(${props => props.texture});
  }
  &.on input.active {
    background: var(--c-knob);
  }
`;

const Radio = styled.input`
  -webkit-appearance: none;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 0 2px;
  height: 20px;
  width: 20px;
  user-select: none;
  border-radius: var(--g-radius);
  border-top: solid 2px var(--c-knob);
  border-left: solid 1px var(--c-knob);
  border-right: solid 1px var(--c-power-off);
  border-bottom: solid 1px var(--c-power-off);
  box-shadow: var(--s-knob);
  transition: all 0.3s ease;
`;
