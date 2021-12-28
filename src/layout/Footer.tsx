import { Button, ButtonProps, Tooltip } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import { ReactComponent as ContentCopy } from "../assets/images/content-copy.svg";
const Footer: React.FC = () => {
  const [copyTooltip, setCopyTooltip] = useState("Copy to clipboard");
  return (
    <footer>
      <div className='footer__content'>
        <span>Please consider donating</span>
        <Tooltip title={copyTooltip}>
          <StyledButton
            endIcon={<ContentCopy />}
            onClick={() => {
              copyToClipboard("ronin:1417b707230c4F2a53819719dDe74FD62F9d6F6F");
              setCopyTooltip("Copied!");
            }}
            onMouseEnter={() => {
              setCopyTooltip("Copy to clipboard");
            }}
          >
            ronin:1417b...F9d6F6F
          </StyledButton>
        </Tooltip>
      </div>
    </footer>
  );
};

export default Footer;

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

const StyledButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  fontSize: "1rem",
  textTransform: "none",
  backgroundColor: "#1975d2",
  "&:hover": {
    backgroundColor: "#359aff",
  },
}));
