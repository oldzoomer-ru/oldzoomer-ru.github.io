import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Main() {
  const download = async (url: string): Promise<string> => {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
    }
    
    const content = await response.text()
    return content
  }

  const mainPageFile: string = import.meta.env.VITE_MAIN_PAGE_FILE_URL
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const call = async () => {
      try {
        setError(null)
        const content = await download(mainPageFile)
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
    <main className="font-cantarell flex justify-center items-center w-full">
      <article className="prose lg:prose-xl p-7">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </article>
    </main>
  )
}

export default Main