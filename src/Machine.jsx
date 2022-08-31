import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Context from "./Components/Context";
import Power from "./Components/Power";
import Volume from "./Components/Volume";
import Bpm from "./Components/Bpm";
import OptionTracks from "./Components/OptionTracks";
import Track from "./Components/Track";
import PlayPause from "./Components/PlayPause";
import Stepsize from "./Components/Stepsize";
import gravel from './Assets/gravel.png';

const Machine = () => {
  const { power, tracks, trackRow, setPlaying, playing } = useContext(Context);
  const [updatedTracks, setUpdatedTracks] = useState(trackRow);

  // Add 'play with spacebar' functionality
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.repeat) return; // Avoid doing anything on excessive pressing
      setTimeout(() => {
        if (power && e.which === 32) setPlaying(playing ? false : true);
      }, 350);
    });
  }, [power, playing, setPlaying]);

  useEffect(() => {
    const updateTracks = () => {
      setUpdatedTracks([...trackRow].slice(0, tracks));
    };
    updateTracks();
  }, [tracks, trackRow]);

  return (
    <Container texture={gravel}>
      <Row>
        <Power />
        <Volume />
        <Bpm />
        <Stepsize />
        <OptionTracks />
        <PlayPause />
      </Row>
      {power &&
        updatedTracks.map((track, index) => {
          return (
            <Row key={index}>
              <Track index={index} id={track.id} url={track.url} />
            </Row>
          );
        })}
    </Container>
  );
};
export default Machine;

const Container = styled.div`
  background: linear-gradient(130deg, #454f4f, var(--c-primary)), url(${props => props.texture});
  background-blend-mode: multiply;
  box-shadow: 25px 25px 30px -15px var(--c-power-off) inset, 8px 8px 8px #0005;
  border-bottom: solid 8px var(--c-knob);
  border-left: solid 8px var(--c-power-off);
  border-right: solid 8px var(--c-knob);
  border-top: solid 8px var(--c-power-off);
  border-radius: 10px;
  display: grid;
  gap: var(--g-gap-sm);
  max-width: var(--g-max-width);
  width: 100%;
  margin: 0 auto;
  padding: var(--g-gap-md);
  position: relative;
`;

const Row = styled.div`
  display: flex;
  gap: var(--g-gap-sm);
  padding-bottom: var(--g-gap-sm);
  border-bottom: solid 1px var(--c-power-off);
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
