import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonMini = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="2" y="3" rx="0" ry="0" width="104" height="58" /> 
    <rect x="2" y="74" rx="0" ry="0" width="71" height="16" /> 
    <rect x="1" y="95" rx="0" ry="0" width="111" height="18" />
  </ContentLoader>
)

export default SkeletonMini
