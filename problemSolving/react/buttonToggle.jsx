// 1. Button Toggle

// Create a React component that renders a button. The button should display "OFF" initially, and when the user clicks it, the text should change to "ON". Clicking it again should toggle it back to "OFF". Continue toggling between the two states on every click.import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const Toggle = () => {
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <button type="button" onClick={handleClick}>
            {toggle ? "ON" : "OFF"}
        </button>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Toggle />)