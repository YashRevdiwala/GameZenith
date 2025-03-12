import React from "react"

import { Wrapper } from "./wrapper"
import { Toggle } from "./toggle"
import { Navigation } from "./navigation"

export const CreatorSidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}
