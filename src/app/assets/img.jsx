import React, { useState, useEffect } from "react"
import ImageField from "../components/common/form/imageField"

const Img = () => {
    const [src, setSrc] = useState()
    useEffect(() => {
        const res = () => {
            return `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`
        }
        setSrc(res)
    }, [])
    return (
        <>
            <ImageField
                src={src}
                name="image"
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="150"
            />
        </>
    )
}

export default Img
