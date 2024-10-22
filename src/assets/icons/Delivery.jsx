import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Delivery = (props) => (
    <Svg
        fill={props?.color ?? "#000"}
        width="22px"
        height="22px"
        viewBox="0 -18.84 122.88 122.88"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
            enableBackground: "new 0 0 122.88 85.22",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <G>
            <Path
                className="st0"
                d="M82.08 7.32h35.4c1.36 0 2.44 1.12 2.44 2.44V30.4h0.24c1.48 0 2.72 1.2 2.72 2.72v3a2.76 2.76 0 0 1 -2.76 2.76h-19c14.12 1.28 22.2 14.4 21.32 31.48h-12.56a14.88 14.88 0 0 1 -29.84 0h-38.36l-0.04 -0.8a37.28 37.28 0 0 1 -0.36 5.8l-33.4 -15.8L0 55.84c6.32 -7.2 13.96 -10.2 23.16 -8.12a39.76 39.76 0 0 1 -0.08 0L33.6 13.04 28.84 12.96C27.84 12.92 26.8 13.2 26.12 12.72 24.96 12.68 23.96 12 23.24 10.88 22.6 9.88 22.24 8.56 22.24 7.08s0.4 -2.8 1 -3.8A4 4 0 0 1 25.24 1.6L25.28 1.32C26.4 -0.44 28.6 0.08 30.52 0.08L32.4 0.2a10.12 10.12 0 0 1 4 1.36l2.16 1.2h1.76l5.88 1.12c1.92 0.36 2.2 0.2 1.76 2.6 -0.08 0.28 -0.12 0.6 -0.24 0.88 -0.56 1.72 -1.04 1.08 -2.84 0.72L39.36 6.96a22.32 22.32 0 0 1 -1.48 8.12c3.16 2.68 4.6 6.52 2.44 11.52l-5.28 16.2c8.84 6.24 14.12 11.92 14.44 21.2h11.68c7.2 -5.44 6 -15.16 -1.88 -21.36V32.96c0 -1.84 1 -2.68 2.84 -2.64h17.52V9.8c0 -1.36 1.12 -2.44 2.44 -2.44zm8.6 19.36h18.2c0.16 0 0.28 0.12 0.28 0.28v0.52a0.28 0.28 0 0 1 -0.28 0.28h-18.2A0.28 0.28 0 0 1 90.4 27.48V26.96c0 -0.16 0.12 -0.28 0.28 -0.28zm9.84 -11.32c5.32 0.44 9.2 4.44 8.52 9.72h-18.52c-0.64 -5.32 3.24 -9.32 8.6 -9.72V13.88h-1.48A0.28 0.28 0 0 1 97.36 13.6V12.64c0 -0.16 0.12 -0.28 0.28 -0.28h4.36c0.16 0 0.28 0.12 0.28 0.28V13.6a0.28 0.28 0 0 1 -0.28 0.28h-1.44v1.48zM7.92 59.56l13.32 6.32 -4.32 -2a6.56 6.56 0 0 0 1.36 13 6.52 6.52 0 0 0 6.56 -6.56 6.92 6.92 0 0 0 -0.76 -3.12l9.08 4.28a14.92 14.92 0 0 1 -29.8 -1.2 14.76 14.76 0 0 1 4.56 -10.76zM25.28 4.2l0.28 6.04A2.36 2.36 0 0 1 25.08 9.68C24.64 9.04 24.4 8.08 24.4 7.04A5.24 5.24 0 0 1 25.24 4.12zM88.4 70.32h13.16a6.56 6.56 0 0 1 -6.56 6.56 6.56 6.56 0 0 1 -6.56 -6.56z"
            />
        </G>
    </Svg>
);
export default Delivery;
