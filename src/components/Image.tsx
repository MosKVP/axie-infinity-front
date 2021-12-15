import React, { useEffect, useState } from "react";

interface Props extends React.ComponentProps<"img"> {
  fallbackSrc?: string;
}

export const Image: React.FC<Props> = ({ src, alt, fallbackSrc, ...props }) => {
  const [source, setSource] = useState(src);
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    setSource(src);
    setIsErr(false);
  }, [src]);

  const onError = () => {
    if (!isErr && fallbackSrc) {
      setSource(fallbackSrc);
      setIsErr(true);
    }
  };

  return <img src={source} alt={alt} onError={onError} {...props} />;
};
