import React, { useState } from "react"


export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const toggleLoading = React.useCallback((val) => {
        setLoading(val)
    }, [])


    return { loading, toggleLoading }

}