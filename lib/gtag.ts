// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

// Track page view
export function pageview(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    })
  }
}

// Track WhatsApp click
export function trackWhatsAppClick(productName?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label: productName || 'general',
    })
  }
}

// Track phone call click
export function trackPhoneClick() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_call', {
      event_category: 'contact',
    })
  }
}

// Track form submission
export function trackFormSubmission(formType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formType,
    })
  }
}

// Track custom event
export function trackEvent(event: GtagEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  }
}
