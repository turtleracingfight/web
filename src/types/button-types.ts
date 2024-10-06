import {CSSProperties} from "react";

export type TBtnCommon = {
    width?: string
    height?: string
    text: string
    style?: CSSProperties
    handlerClick?: () => void
    rtArrow?: boolean
}
