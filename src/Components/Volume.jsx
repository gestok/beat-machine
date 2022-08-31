import { useContext } from "react";
import Context from "./Context";
import OptionSlider from "./OptionSlider";

const Volume = () => {
  const { volume, setVolume } = useContext(Context);

  return (
    <OptionSlider
      title="VOLUME"
      min="0"
      max="100"
      stateValue={volume}
      setStateValue={setVolume}
      pseudo="%"
    />
  );
}
export default Volume;
