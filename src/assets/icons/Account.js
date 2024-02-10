import * as React from "react";
import Svg, { Defs, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Account = (props) => (
    <Svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        fill={props?.color ?? "#000"}
    >
        <Defs></Defs>
        <Circle className="cls-1" cx={12} cy={7.25} r={5.73} />
        <Path
            className="cls-1"
            d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
        />
    </Svg>
);
export default Account;
