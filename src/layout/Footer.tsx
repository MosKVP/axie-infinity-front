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
              copyToClipboard("ronin:28043f39a73a412e1d15f669f16a8a9fea180cf8");
              setCopyTooltip("Copied!");
            }}
            onMouseEnter={() => {
              setCopyTooltip("Copy to clipboard");
            }}
          >
            ronin:28043...a180cf8
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
