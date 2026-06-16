// shared constants for the kanban board

// the 5 fixed pipeline stages, in display order
export const COLUMNS = [
  'Wishlist',
  'Applied',
  'Technical Test',
  'Interview',
  'Offer/Rejected',
]

// stages where a "next step" (e.g. an upcoming interview) is meaningful
export const NEXT_STEP_STATUSES = ['Applied', 'Technical Test', 'Interview']

// predefined pool of optional modular fields a user can attach to a job card
export const FIELD_POOL = [
  { label: 'Contact Person', type: 'text' },
  { label: 'Interview Questions', type: 'textarea' },
  { label: 'Company Website', type: 'url' },
  { label: 'Relevant Article', type: 'url' },
  { label: 'Promotion Options', type: 'text' },
  { label: 'My Questions About the Job', type: 'textarea' },
]
