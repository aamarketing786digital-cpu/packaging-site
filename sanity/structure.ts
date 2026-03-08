import type { StructureResolver } from 'sanity/structure'
import { PackageIcon, DocumentTextIcon, TagIcon, CogIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Products
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .schemaType('product')
        .child(S.documentTypeList('product').title('All Products').defaultOrdering([{ field: '_createdAt', direction: 'desc' }])),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .schemaType('category')
        .child(S.documentTypeList('category').title('All Categories').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      // Divider
      S.divider(),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentTextIcon)
        .schemaType('post')
        .child(S.documentTypeList('post').title('All Posts').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),

      // Divider
      S.divider(),

      // Settings
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Site Settings')
        ),
    ])
