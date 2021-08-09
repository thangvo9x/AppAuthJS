import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
        stroke="#016230"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgLogin = React.memo(SvgComponent);
export default SvgLogin;
