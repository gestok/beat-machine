import { useContext } from "react";
import Context from "./Context";
import OptionSlider from "./OptionSlider";

const Bpm = () => {
  const { bpm, setBpm } = useContext(Context);

  return (
    <OptionSlider
      title="BPM"
      min="20"
      max="220"
      step={2}
      stateValue={bpm}
      setStateValue={setBpm}
      pseudo="bpm"
    />
  );
}
export default Bpm;
