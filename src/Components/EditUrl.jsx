import styled from "styled-components";

const EditUrl = (props) => {
  const handleOnChange = (e) => {
    const base64 = e.target.value;
    if (base64.startsWith("data:audio/") && base64.includes("base64"))
      props.setSource(e.target.value);
    else props.setSource(props.source);
  };

  return (
    <Wrapper editing={props.editing}>
      <Title>
        Paste a valid{" "}
        <Link
          href="https://dopiaza.org/tools/datauri/index.php"
          title="Data: URI Generator"
          target="_blank"
        >
          base64
        </Link>{" "}
        string to change sound:
      </Title>
      <Input onChange={(e) => handleOnChange(e)} />
    </Wrapper>
  );
};
export default EditUrl;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #2C333399;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--g-gap-xs);
  visibility: ${(props) => (props.editing === "url" ? "visible" : "hidden")};
  opacity: ${(props) => (props.editing === "url" ? 1 : 0)};
  transition: all 0.3s ease;
`;

const Title = styled.span`
  color: var(--c-tertiary);
  cursor: default;
`;

const Input = styled.input`
  outline: 0;
  border: solid 1px var(--c-power-off);
  border-radius: var(--g-radius);
  background: var(--c-knob);
  color: var(--c-label);
  padding: 4px 5px 3px;
`;

const Link = styled.a`
  outline: 0;
  color: var(--c-tertiary);
`;