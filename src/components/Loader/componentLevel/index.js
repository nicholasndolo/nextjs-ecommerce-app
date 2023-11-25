import { Space_Mono } from "next/font/google"
import { PulseLoader } from "react-spinners"

export default function ComponentLevelLoader({text, color, loading, size}){

  return(
    <span className="flex gap-1 items-center">
      {text}
      <PulseLoader
       color={color}
       loading={loading}
       size={size}
       data-testid="loader"
       />

    </span>
  )
}