import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

const PLACEHOLDER =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9W-4C8o3gRqwN270j6o_BoQCDeOLUOtyWZ0PisH2l2Z_Z6YDyoHUjzhYft5bkdkEirg&usqp=CAU";

export default function SafeImage(props: ImageProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc(PLACEHOLDER)}
      alt={props.alt}
    />
  );
}
