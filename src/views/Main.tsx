import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remoteFileLoader from "../components/RemoteFileLoader"
import remarkGfm from "remark-gfm"

function Main() {
  const mainPageFile: string = import.meta.env.VITE_MAIN_PAGE_FILE_URL
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const call = async () => {
      try {
        setError(null)
        const content = await remoteFileLoader(mainPageFile)
        setText(content)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content")
        console.error("Failed to load markdown:", err)
      }
    }

    call()
  }, [mainPageFile])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <article className="prose lg:prose-xl font-cantarell p-7">
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
    </article>
  )
}

export default Main