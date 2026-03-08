import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const settingsSchema = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Primary contact number for WhatsApp (format: +971XXXXXXXXX)',
      validation: (Rule) => Rule.required().regex(/^\+971\d{9}$/),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Secondary contact number (format: +971XXXXXXXXX)',
      validation: (Rule) => Rule.required().regex(/^\+971\d{9}$/),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      description: 'Contact email for inquiries',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      description: 'Physical business address',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text',
      rows: 2,
      description: 'Operating hours for display on contact page',
      initialValue: 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
