import Loadericon from './LoaderIcon'

export default function Loader() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black">
      <Loadericon />
    </div>
  )
}
