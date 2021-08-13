/** @format */

import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={87}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M40.318 4.12c1.416 0 2.62.486 3.593 1.438.974.952 1.459 2.137 1.459 3.532 0 1.396-.487 2.58-1.459 3.533-.97.95-2.177 1.439-3.593 1.439h-2.601v4.862h-2.919V4.12h5.52zm0 7.21c1.247 0 2.155-.972 2.155-2.242 0-1.291-.908-2.24-2.155-2.24h-2.601v4.481h2.6zM49.842 16.13h6.236v2.792h-9.152V4.119h9.152V6.91h-6.236v3.15h5.602v2.75h-5.602v3.32zM66.199 4.12h2.918v14.8h-2.219l-6.342-9.05v9.05h-2.918V4.12h2.218l6.343 9.029v-9.03zM10.64 4.056v2.796H6.903v12.03H3.981V6.853H0V4.056h10.64z"
        fill="#E87A26"
      />
      <Path
        d="M33.192 12.11c-.05.493-.228.962-.52 1.367-.806 1.115-1.966 1.713-3.074 1.921a4.92 4.92 0 01-.91.087h-8.933v1.746c0 1.962 1.912 3.632 3.913 4.232.78.235 1.608.22 2.388-.011 3.976-1.337 6.897-4.989 7.14-9.358l-.004.016z"
        fill="url(#logo_svg__paint0_linear)"
      />
      <Path
        d="M24.578 21.828c.5-.091.99-.215 1.46-.374a4.177 4.177 0 01-2.372.009c-2.003-.6-3.913-2.267-3.913-4.232v-5.619c0-.767-.809-1.191-1.873-1.66-1.23.856-4.446 2.951-4.433 5.657.002.579.189 1.135.482 1.633.035.058.07.117.107.174 1.125 1.71 2.74 2.984 4.574 3.75l.204.082c.048.02.096.037.143.056 1.167.448 2.432.696 3.757.696"
        fill="url(#logo_svg__paint1_linear)"
      />
      <Path
        d="M19.92 4.41c-.861-.595-1.652-.813-2.465-.78-.37.015-.743.083-1.128.191-.074.02-.143.046-.215.07a.439.439 0 01-.05.015 4.24 4.24 0 00-.23.094l-.026.01c-.504.227-.954.561-1.321.976a10.449 10.449 0 00-2.264 6.51c0 2.13.636 4.113 1.727 5.768-.004-.01-.01-.016-.015-.024-.293-.498-.478-1.055-.482-1.633-.014-2.704 3.198-4.8 4.43-5.658l4.898-3.463-2.86-2.076z"
        fill="url(#logo_svg__paint2_linear)"
      />
      <Path
        d="M25.785 15.483V11.61c0-.748.769-1.172 1.794-1.626 1.745-1.065 4.183-4.384 2.184-6.258l-.004-.004a10.456 10.456 0 013.44 8.303c-.003.022-.003.044-.005.068 0 .006 0 .013-.002.017-.05.493-.228.963-.52 1.367-1.03 1.424-2.642 2.006-3.978 2.006h-3.022"
        fill="url(#logo_svg__paint3_linear)"
      />
      <Path
        d="M29.76 3.726l-.004-.005A10.449 10.449 0 0022.707 1a10.467 10.467 0 00-8.254 4.021 3.903 3.903 0 011.873-1.197c1.234-.348 2.34-.279 3.592.587l7.676 5.562c1.743-1.076 4.16-4.38 2.167-6.247z"
        fill="url(#logo_svg__paint4_linear)"
      />
      <Path
        d="M80.23 11.32L85.48 4h-4.44l-3.03 4.23L74.98 4h-4.47l5.25 7.35L70.27 19h4.47l3.27-4.56L81.25 19h4.47l-5.49-7.68z"
        fill="#8C8C8C"
      />
      <Defs>
        <LinearGradient
          id="logo_svg__paint0_linear"
          x1={17.63}
          y1={16.861}
          x2={34.511}
          y2={16.861}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#273673" />
          <Stop offset={0.5} stopColor="#0F80C4" />
          <Stop offset={1} stopColor="#6FC7EB" />
        </LinearGradient>
        <LinearGradient
          id="logo_svg__paint1_linear"
          x1={21.842}
          y1={25.21}
          x2={16.529}
          y2={8.865}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ACD7D5" />
          <Stop offset={0.5} stopColor="#01AC8C" />
          <Stop offset={1} stopColor="#005F53" />
        </LinearGradient>
        <LinearGradient
          id="logo_svg__paint2_linear"
          x1={11.094}
          y1={13.338}
          x2={21.999}
          y2={5.418}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#EE8F96" />
          <Stop offset={0.5} stopColor="#E6403A" />
          <Stop offset={1} stopColor="#B22226" />
        </LinearGradient>
        <LinearGradient
          id="logo_svg__paint3_linear"
          x1={32.561}
          y1={2.421}
          x2={27.649}
          y2={17.534}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DFE0E0" />
          <Stop offset={0.5} stopColor="#8D9E95" />
          <Stop offset={1} stopColor="#495852" />
        </LinearGradient>
        <LinearGradient
          id="logo_svg__paint4_linear"
          x1={16.269}
          y1={1.291}
          x2={29.732}
          y2={7.855}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9E5A9" />
          <Stop offset={0.7} stopColor="#EF952F" />
          <Stop offset={1} stopColor="#D57828" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

const SvgLogo = React.memo(SvgComponent);
export default SvgLogo;
