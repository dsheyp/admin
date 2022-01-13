import React, { Children, useLayoutEffect, useRef } from "react"
import clsx from "clsx"

const TwoSplitPane: React.FC = ({ children }) => {
  const childrenCount = Children.count(children)
  const gridRef = useRef(null)
  const gridRowHeight = useRef(0)
  const height = gridRowHeight.current
    ? `${gridRowHeight.current}px`
    : "1fr"

  useLayoutEffect(() => {
    if (gridRef.current) {
      let { top } = gridRef.current.getBoundingClientRect()
      let height = window.innerHeight
      // take the inner height of the window, subtract 32 from it (for the bottom padding), then subtract that from the top position of our grid row (wherever that is)
      gridRowHeight.current = height - 32 - top
    }
  }, [])

  if (childrenCount > 2) {
    throw new Error("TwoSplitPane can only have two or less children")
  }

  return (
    <div
      ref={gridRef}
      className={clsx(
        "grid gap-large grid-cols-1 medium:grid-cols-2 medium:grid-rows-[length:var(--tsl-row-height)]"
      )}
      style={{ "--tsl-row-height": height }}
    >
      {Children.map(children, (child, i) => {
        return (
          <div className="w-full h-full" key={i}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default TwoSplitPane
