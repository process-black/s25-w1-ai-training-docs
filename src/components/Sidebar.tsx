import Link from 'next/link'
import { getAllDocs } from '@/lib/docs'

export function Sidebar() {
  const docs = getAllDocs()
  
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 p-6">
      <div className="mb-8">
        <Link href="/" className="text-xl font-black text-white">
          AI Training
        </Link>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="block text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}