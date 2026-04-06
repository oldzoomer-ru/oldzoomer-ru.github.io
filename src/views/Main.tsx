import { useEffect, useState, useCallback } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import StructuredData from "../components/StructuredData"
import { Link } from "react-router"

interface SiteData {
  metadata: {
    title: string
    description: string
    author: string
    url: string
    language: string
    updatedAt?: string
  }
  person: {
    name: string
    jobTitle: string
    email: string
    description: string
    sameAs: string[]
    knowsAbout: string[]
  }
  projects: Array<{
    name: string
    description: string
    codeRepository: string
    programmingLanguage: string
  }>
  content: {
    mainPageFileUrl: string
  }
  cv?: {
    personal?: {
      name: string
      phone?: string
      email?: string
      telegram?: string
      setka?: string
      github?: string
      website?: string
      location?: string
      citizenship?: string
    }
  }
}

interface FetchState {
  content: string | null
  error: string | null
  isLoading: boolean
}

function Main() {
  const download = useCallback(async (url: string): Promise<string> => {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
    }
    
    return response.text()
  }, [])

  const [siteData, setSiteData] = useState<SiteData | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)

  const [state, setState] = useState<FetchState>({
    content: null,
    error: null,
    isLoading: true
  })

  // Load site data from JSON
  useEffect(() => {
    let isMounted = true
    
    const loadSiteData = async () => {
      try {
        const response = await fetch('/data/data.json')
        if (!response.ok) {
          throw new Error(`Failed to load site data: ${response.status}`)
        }
        const fullData = await response.json()
        
        // Transform to SiteData interface
        const siteData: SiteData = {
          metadata: {
            title: fullData.metadata.title,
            description: fullData.metadata.description,
            author: fullData.metadata.author,
            url: fullData.metadata.url,
            language: fullData.metadata.language,
            updatedAt: fullData.metadata.updatedAt
          },
          person: fullData.person,
          projects: fullData.projects,
          content: fullData.content,
          cv: fullData.cv
        }
        
        if (isMounted) {
          setSiteData(siteData)
          // Update document title and meta tags dynamically
          document.title = siteData.metadata.title
          
          // Update meta description
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            metaDescription.setAttribute('content', siteData.metadata.description)
          }
          
          // Update meta author
          const metaAuthor = document.querySelector('meta[name="author"]')
          if (metaAuthor) {
            metaAuthor.setAttribute('content', siteData.metadata.author)
          }
          
          // Update canonical URL
          const linkCanonical = document.querySelector('link[rel="canonical"]')
          if (linkCanonical) {
            linkCanonical.setAttribute('href', siteData.metadata.url)
          }
          
          // Update Open Graph tags
          const ogTitle = document.querySelector('meta[property="og:title"]')
          if (ogTitle) {
            ogTitle.setAttribute('content', siteData.metadata.title)
          }
          
          const ogDescription = document.querySelector('meta[property="og:description"]')
          if (ogDescription) {
            ogDescription.setAttribute('content', siteData.metadata.description)
          }
          
          const ogUrl = document.querySelector('meta[property="og:url"]')
          if (ogUrl) {
            ogUrl.setAttribute('content', siteData.metadata.url)
          }
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load site data"
          setDataError(errorMessage)
          console.error("Failed to load site data:", err)
        }
      }
    }

    loadSiteData()
    
    return () => {
      isMounted = false
    }
  }, [])

  // Load markdown content
  useEffect(() => {
    if (!siteData) return
    
    let isMounted = true
    
    const loadContent = async () => {
      try {
        setState(prev => ({ ...prev, error: null, isLoading: true }))
        const content = await download(siteData.content.mainPageFileUrl)
        
        if (isMounted) {
          setState({ content, error: null, isLoading: false })
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load content"
          setState({ content: null, error: errorMessage, isLoading: false })
          console.error("Failed to load markdown:", err)
        }
      }
    }

    loadContent()
    
    return () => {
      isMounted = false
    }
  }, [siteData, download])

  if (dataError) {
    return (
      <div role="alert" className="p-4 text-red-600 bg-red-50 rounded m-4">
        <h2 className="text-lg font-semibold">Ошибка загрузки данных сайта</h2>
        <p>{dataError}</p>
      </div>
    )
  }

  if (!siteData) {
    return (
      <div role="status" className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-black">Загрузка...</div>
      </div>
    )
  }

  if (state.isLoading) {
    return (
      <div role="status" className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-black">Загрузка...</div>
      </div>
    )
  }

  if (state.error) {
    return (
      <div role="alert" className="p-4 text-red-600 bg-red-50 rounded m-4">
        <h2 className="text-lg font-semibold">Ошибка загрузки контента</h2>
        <p>{state.error}</p>
      </div>
    )
  }

  // Generate structured data from JSON
  const personStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": siteData.metadata.url,
        "name": siteData.person.name,
        "jobTitle": siteData.person.jobTitle,
        "url": siteData.metadata.url,
        "email": siteData.person.email,
        "description": siteData.person.description,
        "sameAs": siteData.person.sameAs,
        "knowsAbout": siteData.person.knowsAbout
      },
      ...siteData.projects.map(project => ({
        "@type": "SoftwareSourceCode" as const,
        "name": project.name,
        "description": project.description,
        "codeRepository": project.codeRepository,
        "programmingLanguage": project.programmingLanguage,
        "author": {
          "@id": siteData.metadata.url
        }
      }))
    ]
  }

  return (
    <>
      <StructuredData data={personStructuredData} />
      <main className="font-cantarell flex justify-center items-center w-full">
        <article className="prose lg:prose-xl p-7">
          <Markdown remarkPlugins={[remarkGfm]}>{state.content ?? ""}</Markdown>
        </article>
      </main>
      
      {/* CV Link */}
      <section className="w-full max-w-4xl mx-auto p-7 text-center">
        <Link 
          to="/cv" 
          className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
        >
          Посмотреть полное резюме
        </Link>
      </section>
    </>
  )
}

export default Main