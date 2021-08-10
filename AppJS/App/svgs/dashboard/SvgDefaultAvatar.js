import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgDefaultAvatar(props) {
  return (
    <Svg
      width={66}
      height={66}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M33 65.258c17.816 0 32.259-14.442 32.259-32.258C65.259 15.184 50.816.74 33 .74 15.184.741.741 15.184.741 33 .741 50.816 15.184 65.258 33 65.258z"
        fill="#D8F2F0"
      />
      <Path
        d="M32.867 64.28a27.35 27.35 0 01-21.031-10.376l-.17-.203.04-.267A21.546 21.546 0 0122.1 37.55l.4-.228.319.331a13.91 13.91 0 0020.096 0l.318-.33.4.227a21.549 21.549 0 0110.394 15.891l.041.267-.17.202a27.35 27.35 0 01-21.031 10.37zm.226-26.518a12.547 12.547 0 1112.622-12.546 12.598 12.598 0 01-12.622 12.546v0z"
        stroke="#005E52"
      />
    </Svg>
  );
}

export default SvgDefaultAvatar;
