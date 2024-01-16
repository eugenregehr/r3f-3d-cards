export default function Loadericon() {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src="icons/loader.gif" alt="loader" className="h-12 w-12" />
      <span className="block text-xs text-gray-400">loading...</span>
    </div>
  )
}
