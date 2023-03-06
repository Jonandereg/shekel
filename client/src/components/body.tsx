import { Global } from '@emotion/react'

export const GlobalBodyStyles = () => (
  // This is the Global component from the Emotion library that allows us to add global styles to the app
  // I was going to spend more time prettifying the app but I ran out of time
  <Global
    styles={`
      body {
        background-color: #000000;
      }
      `}
  />
)
