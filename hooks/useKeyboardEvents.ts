import { useEffect } from "react"
import state from "state"
import { getKeyboardEventInfo, isDarwin } from "utils/utils"

export default function useKeyboardEvents() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        state.send("CANCELLED")
      } else if (e.key === "z" && (isDarwin() ? e.metaKey : e.ctrlKey)) {
        if (e.shiftKey) {
          state.send("REDO")
        } else {
          state.send("UNDO")
        }
      }

      state.send("PRESSED_KEY", getKeyboardEventInfo(e))
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "Escape") {
        state.send("CANCELLED")
      }

      state.send("RELEASED_KEY", getKeyboardEventInfo(e))
    }

    document.body.addEventListener("keydown", handleKeyDown)
    document.body.addEventListener("keyup", handleKeyUp)
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown)
      document.body.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
}