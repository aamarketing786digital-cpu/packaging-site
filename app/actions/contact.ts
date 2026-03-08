'use server'

import { getSettings } from '@/lib/sanity'

// Contact form validation schema
const contactFormSchema = {
  name: (value: string) => value.length >= 2 && value.length <= 100,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value: string) => !value || /^[\d\s+()-]{8,20}$/.test(value),
  company: (value: string) => !value || value.length <= 100,
  subject: (value: string) => value.length >= 3 && value.length <= 200,
  message: (value: string) => value.length >= 10 && value.length <= 2000,
}

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export type ContactFormResult = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  // Validate input
  const errors: Record<string, string> = {}

  if (!contactFormSchema.name(formData.name)) {
    errors.name = 'Name must be between 2 and 100 characters'
  }

  if (!contactFormSchema.email(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (formData.phone && !contactFormSchema.phone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (formData.company && !contactFormSchema.company(formData.company)) {
    errors.company = 'Company name must be 100 characters or less'
  }

  if (!contactFormSchema.subject(formData.subject)) {
    errors.subject = 'Subject must be between 3 and 200 characters'
  }

  if (!contactFormSchema.message(formData.message)) {
    errors.message = 'Message must be between 10 and 2000 characters'
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors,
    }
  }

  try {
    // Get settings for future use (email forwarding, WhatsApp notifications)
    const settings = await getSettings()
    void settings // Used for future email/WhatsApp forwarding
    // In production, you would:
    // 1. Send email using a service like Resend, SendGrid, or AWS SES
    // 2. Log to database for audit trail
    // 3. Send notification to internal systems

    // For now, we'll log the submission and return success
    console.log('[Contact Form Submission]', {
      timestamp: new Date().toISOString(),
      ...formData,
    })

    // TODO: Implement actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'contact@nextlevelpackaging.ae',
    //   to: settings.email || 'info@nextlevelpackaging.ae',
    //   subject: `New Contact: ${formData.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${formData.name}</p>
    //     <p><strong>Email:</strong> ${formData.email}</p>
    //     <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
    //     <p><strong>Company:</strong> ${formData.company || 'N/A'}</p>
    //     <p><strong>Subject:</strong> ${formData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${formData.message}</p>
    //   `,
    // })

    // TODO: Optional - Forward to WhatsApp for instant notification
    // const whatsappUrl = generateWhatsAppUrl(
    //   {
    //     productName: `Contact Form: ${formData.subject}`,
    //     sku: `From: ${formData.name}`,
    //     details: `${formData.message}\n\nContact: ${formData.email}, ${formData.phone || 'No phone'}, ${formData.company || 'No company'}`
    //   },
    //   settings.whatsappNumber
    // )

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
    }
  } catch (error) {
    console.error('[Contact Form Error]', error)

    return {
      success: false,
      message: 'An error occurred while submitting the form. Please try again or contact us via WhatsApp.',
    }
  }
}
