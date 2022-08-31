import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiEdit3, FiVolume1, FiHeadphones } from "react-icons/fi";
import { BsSoundwave, BsMicMute } from "react-icons/bs";
import Context from "./Context";
import EditUrl from "./EditUrl";

const Track = (props) => {
  const { volume, currentPad, sequencer, setSequencer, playing } = useContext(Context);
  const [label, setLabel] = useState(props.id ? props.id : "Track");
  const [editing, setEditing] = useState("");
  const [source, setSource] = useState(props.url);
  const audio = useRef(null);
  const audioContextRef = useRef(null);
  const gainNode = useRef(null);
  const panner = useRef(null);

  const handlePadClick = (index) => {
    const updatedSequencer = [...sequencer];
    updatedSequencer[props.index][index] === 0
      ? (updatedSequencer[props.index][index] = 1)
      : (updatedSequencer[props.index][index] = 0);
    setSequencer(updatedSequencer);
  };

  // Component Did Mount
  useEffect(() => {
    // Create Audio
    audio.current = new Audio();
    audio.current.crossOrigin = "anonymous";
    audio.current.src = source;

    // Use Web Audio API
    audioContextRef.current = new AudioContext();
    const track = audioContextRef.current.createMediaElementSource(audio.current);
    // Create the Node that controls the volume
    gainNode.current = audioContextRef.current.createGain();
    // Create the Node that controls the panning
    const pannerOptions = { pan: 0 };
    panner.current = new StereoPannerNode(audioContextRef.current, pannerOptions);
    // Connect to: Gain -> Panning -> Destination
    track.connect(gainNode.current).connect(panner.current).connect(audioContextRef.current.destination);
  }, [source]);

  // ComponentDidUpdate - Mute/Unmute/Global Volume
  useEffect(() => {
    if (editing !== "mute") audio.current.volume = volume / 100;
    else audio.current.volume = 0;
  }, [editing, volume]);

  // Play Sound
  useEffect(() => {
    if (sequencer[props.index][currentPad]) {
      audio.current.currentTime = 0;
      audio.current.play();
    }
  }, [sequencer, currentPad]);

  return (
    <Row>
      <Info>
        <Title playing={playing}>
          <CurrentTitle editing={editing}>{label}</CurrentTitle>
          <EditTitle
            tabIndex={0}
            editing={editing}
            placeholder={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.which === 13 && setEditing("")}
          />
        </Title>
        <Options>
          <Button
            tabIndex={-1}
            className={editing === "label" && "active"}
            title="Change Track Label"
            onClick={() => setEditing(editing !== "label" ? "label" : "")}
          >
            <FiEdit3 />
          </Button>
          <Button
            tabIndex={-1}
            className={editing === "url" && "active"}
            title="Change Track Sound"
            onClick={() => setEditing(editing !== "url" ? "url" : "")}
          >
            <BsSoundwave />
          </Button>
          <Button
            tabIndex={-1}
            className={editing === "mute" && "active"}
            title="Mute Track"
            onClick={() => setEditing(editing !== "mute" ? "mute" : "")}
          >
            <BsMicMute />
          </Button>
        </Options>
      </Info>
      <Trackpad id="trackpad">
        {sequencer[props.index].map((value, index) => {
          return (
            <Pad
              tabIndex={-1}
              key={index}
              className={
                currentPad === index
                  ? value
                    ? "playing active"
                    : "playing"
                  : value && "active"
              }
              onClick={() => handlePadClick(index)}
            />
          );
        })}
        <EditUrl
          tabIndex={-1}
          source={props.url}
          setSource={setSource}
          editing={editing}
        />
      </Trackpad>
      <AudioOptions>
        <AudioOption>
          <AudioLabel playing={playing}><FiVolume1 size="21" /></AudioLabel>
          <AudioInput type="range" min="0" max="2" defaultValue="1" step="0.01" onChange={(e) => gainNode.current.gain.value = e.target.value } />
        </AudioOption>
        <AudioOption>
          <AudioLabel playing={playing}><FiHeadphones size="17" /></AudioLabel>
          <AudioInput type="range" min="-1" max="1" defaultValue="0" step="0.01" onChange={(e) => panner.current.pan.value = e.target.value } />
        </AudioOption>
      </AudioOptions>
    </Row>
  );
};
export default Track;

const Row = styled.div`
  display: flex;
  gap: var(--g-gap-sm);
`;

const Info = styled.div`
  display: flex;
  gap: var(--g-gap-xs);
  flex-direction: column;
`;

const Trackpad = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--g-gap-xs);
  max-width: 450px;
`;

const Pad = styled.button`
  position: relative;
  outline: 0;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  width: 22px;
  height: 22px;
  background: var(--c-label);
  box-shadow: var(--s-pad);
  border-bottom: solid 2px var(--c-power-off);
  border-radius: var(--g-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    border-bottom: solid 2px transparent;
    box-shadow: 0px 0px 2px #0002;
    transform: translate(0px, 2px);
  }
  &.active {
    background: var(--c-quaternary);
    box-shadow: 0px 0px 4px 2px var(--c-tertiary) inset, var(--s-pad);
  }
  &.playing::before {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: transparent;
    border-radius: var(--g-radius);
    box-shadow: 0 0 15px var(--c-tertiary);
  }
`;

const Title = styled.span`
  position: relative;
  display: flex;
  color: ${props => props.playing ? 'var(--c-tertiary)' : 'var(--c-label)'};
  background: var(--c-knob);
  border-radius: var(--g-radius);
  padding: 4px 5px 2px;
  user-select: none;
  pointer-events: none;
  width: 90px;
`;

const CurrentTitle = styled.span`
  overflow: hidden;
  white-space: nowrap;
  visibility: ${(props) => (props.editing === "label" ? "hidden" : "visible")};
  opacity: ${(props) => (props.editing === "label" ? "0" : "1")};
  transition: all 0.3s ease;
`;

const EditTitle = styled.input`
  color: var(--c-quaternary);
  background: var(--c-label);
  outline: 0;
  border: none;
  border-radius: var(--g-radius);
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: auto;
  width: calc(100% - 10px);
  padding: 4px 5px 2px;
  visibility: ${(props) => (props.editing === "label" ? "visible" : "hidden")};
  opacity: ${(props) => (props.editing === "label" ? "1" : "0")};
  transition: all 0.3s ease;
`;

const Options = styled.span`
  display: flex;
  gap: var(--g-gap-xs);
`;

const Button = styled.button`
  border: none;
  background: var(--c-knob);
  border-radius: var(--g-radius);
  color: var(--c-label);
  padding: 0;
  margin: 0;
  outline: 0;
  cursor: pointer;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    color: var(--c-quaternary);
  }
  &.active {
    color: var(--c-secondary);
  }
`;

const AudioOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--g-gap-sm);
`;

const AudioOption = styled.div`
  display: grid;
  grid-template-columns: 25px auto;
  align-items: center;
`;

const AudioLabel = styled.span`
  display: flex;
  transition: all 0.3s ease;
  color: ${props => props.playing ? 'var(--c-tertiary)' : 'var(--c-label)'};
`;

const AudioInput = styled.input`
  -webkit-appearance: none;
  outline: none;
  position: relative;
  height: 4px;
  background: var(--c-power-off);
  border-radius: var(--g-radius);
  border-top: solid 2px var(--c-knob);
  border-left: solid 1px var(--c-knob);
  border-right: solid 1px var(--c-power-off);
  border-bottom: solid 1px var(--c-power-off);
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 18px;
    background: var(--c-knob);
    border-radius: var(--g-radius);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 18px;
    background: var(--c-knob);
    border-radius: var(--g-radius);
    cursor: pointer;
  }
`;