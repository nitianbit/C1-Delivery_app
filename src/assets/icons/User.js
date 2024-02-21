import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const User = (props) => (
    <Svg
        fill="#bbb"
        width="80px"
        height="80px"
        viewBox="0 0 3.6 3.6"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Path
            d="M3.061 2.452a1.716 1.716 0 0 0 -2.522 0 0.15 0.15 0 0 0 -0.039 0.1v0.6A0.15 0.15 0 0 0 0.65 3.3h2.3a0.15 0.15 0 0 0 0.15 -0.15v-0.6a0.15 0.15 0 0 0 -0.039 -0.098"
            className="clr-i-solid clr-i-solid-path-1"
        />
        <Path
            cx={18}
            cy={10}
            r={7}
            className="clr-i-solid clr-i-solid-path-2"
            d="M2.5 1A0.7 0.7 0 0 1 1.8 1.7A0.7 0.7 0 0 1 1.1 1A0.7 0.7 0 0 1 2.5 1z"
        />
        <Path
            x={0}
            y={0}
            width={36}
            height={36}
            fillOpacity={0}
            d="M0 0H3.6V3.6H0V0z"
        />
    </Svg>
);
export default User;
