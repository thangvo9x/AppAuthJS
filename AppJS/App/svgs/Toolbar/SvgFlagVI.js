import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M24 0H0v16h24V0z" fill="#C8172B" />
      <Path
        d="M13.529 8.762l.942 2.943L12 9.887l-2.471 1.818.942-2.943L8 6.943h3.054L12 4l.946 2.943H16l-2.471 1.819z"
        fill="#FCFF2C"
      />
    </Svg>
  );
}

const SvgFlagVI = React.memo(SvgComponent);
export default SvgFlagVI;
