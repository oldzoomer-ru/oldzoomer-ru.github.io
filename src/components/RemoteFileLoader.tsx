async function remoteFileLoader(url: string): Promise<string> {
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
  
  const content = await response.text()
  return content
}

export default remoteFileLoader