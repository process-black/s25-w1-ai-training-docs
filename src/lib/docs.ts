import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), '_docs')

export interface DocInfo {
  slug: string
  title: string
  frontmatter: any
}

export function getAllDocs(): DocInfo[] {
  const fileNames = fs.readdirSync(docsDirectory)
  
  const docs = fileNames
    .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(docsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data: frontmatter } = matter(fileContents)
      
      return {
        slug,
        title: frontmatter.title || slug,
        frontmatter,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  
  return docs
}

export async function getDocContent(slug: string) {
  let fullPath: string
  let fileContents: string
  
  // Try .md first, then .mdx
  const mdPath = path.join(docsDirectory, `${slug}.md`)
  const mdxPath = path.join(docsDirectory, `${slug}.mdx`)
  
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else {
    throw new Error(`No file found for slug: ${slug}`)
  }
  
  fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)
  
  return {
    frontmatter,
    content,
  }
}