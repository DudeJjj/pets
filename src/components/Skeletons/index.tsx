import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={700}
    height={260}
    viewBox="0 0 700 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="2" y="3" rx="3" ry="3" width="690" height="159" />
    </ContentLoader> 
  )
}

export default Skeleton
