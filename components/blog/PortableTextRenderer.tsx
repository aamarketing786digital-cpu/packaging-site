'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value.asset) return null

      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={urlFor(value.asset).width(1200).height(675).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-text-secondary">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-bg-subtle p-4 rounded-lg overflow-x-auto my-6">
          <code className="text-sm font-mono">{value.code}</code>
        </pre>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-heading font-bold mt-12 mb-4 text-brand-primary">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-heading font-semibold mt-10 mb-4 text-brand-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-heading font-semibold mt-8 mb-3 text-brand-primary">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-heading font-semibold mt-6 mb-3 text-brand-primary">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="my-4 leading-relaxed text-text-secondary">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-accent pl-4 my-6 italic text-text-secondary bg-bg-subtle py-2 pr-4 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside my-4 space-y-2 text-text-secondary ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside my-4 space-y-2 text-text-secondary ml-4">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-brand-accent hover:text-brand-accent-hover underline"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-bg-subtle px-1.5 py-0.5 rounded text-sm font-mono text-brand-accent">
        {children}
      </code>
    ),
  },
}

interface PortableTextRendererProps {
  value: any[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <PortableTextComponent
      value={value}
      components={portableTextComponents}
    />
  )
}
