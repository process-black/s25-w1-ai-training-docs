import { notFound } from 'next/navigation'
import { getDocContent, getAllDocs } from '@/lib/docs'
import { MDXContent } from '@/components/MDXContent'

interface DocsPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slug.split('/').filter(Boolean),
  }))
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params
  const filePath = slug ? slug.join('/') : 'index'
  
  try {
    const { content, frontmatter } = await getDocContent(filePath)
    
    return (
      <div className="max-w-4xl mx-auto">
        {frontmatter.title && (
          <h1 className="text-4xl font-black mb-8 text-white">{frontmatter.title}</h1>
        )}
        <MDXContent content={content} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}