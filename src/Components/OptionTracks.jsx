import { useContext } from "react";
import Context from "./Context";
import OptionSlider from "./OptionSlider";

const OptionTracks = () => {
  const { tracks, setTracks } = useContext(Context);

  return (
    <OptionSlider
      title="TRACKS"
      min="1"
      max="8"
      stateValue={tracks}
      setStateValue={setTracks}
    />
  );
}
export default OptionTracks;