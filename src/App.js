import 'normalize.css';
import Machine from "./Machine";
import styled, { createGlobalStyle } from 'styled-components';
import { ContextProvider } from './Components/Context';
import texture from './Assets/organic-tiles.png';

const App = () => {
  return (
    <ContextProvider>
      <Wrapper tabIndex={0} texture={texture} >
        <Machine />
      </Wrapper>
      <GlobalStyle />
    </ContextProvider>
  );
}
export default App;

const GlobalStyle = createGlobalStyle`
  html {
    /* Palette
     * https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
     */
    --c-primary: #2C3333;
    --c-secondary: #395B64;
    --c-tertiary: #A5C9CA;
    --c-quaternary: #E7F6F2;
    --c-knob: #242929;
    --c-power-off: #373F3F;
    --c-label: #E7F6F250;
    --c-text: #fff;

    --f-main: 'Mukta', sans-serif;

    --s-knob: 0px 0px 4px #0005 inset;
    --s-pad: 0px 2px 6px #0005;

    --g-gap-xs: 0.4rem;
    --g-gap-sm: 1rem;
    --g-gap-md: 2rem;
    --g-gap-lg: 3rem;
    --g-max-width: 740px;
    --g-max-radius: 50px;
    --g-radius: 4px;
  }
`;

const Wrapper = styled.div`
  background: radial-gradient(#5d93a2,#2f4a51), url(${props => props.texture});
  background-blend-mode: multiply;
  font-family: var(--f-main);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0!important;
  > * {
    outline: 0!important;
  }
`;