import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonMax = () => (
  <ContentLoader
    viewBox="0 0 1400 600"
    width={1400}
    height={600}
    title="Loading news..."
  >
    <rect x="42.84" y="9.93" rx="5" ry="5" width="1430.55" height="386.59" />
    <rect x="192.84" y="9.67" rx="0" ry="0" width="1480.72" height="212.12" />
    <rect x="192.84" y="25.67" rx="0" ry="0" width="890" height="19" />
  </ContentLoader>
)

export default SkeletonMax
