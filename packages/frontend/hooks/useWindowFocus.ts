import {useEffect, useState} from "react";

const useWindowFocus = () => {
    const [isWindowFocused, setIsWindowFocused] = useState(true)
    useEffect(() => {
        const onVisibilityChange = (e: Event) => {
            const isDocumentHidden = document.hidden
            if (isDocumentHidden) {
                setIsWindowFocused(false)
            } else {
                setIsWindowFocused(true)
            }
        }

        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])
    return {
        isWindowFocused
    }
}

export default useWindowFocus
