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

// the final stage, where a job can be labeled with its outcome
export const FINAL_STATUS = 'Offer/Rejected'

// outcome badge styles - rejected needs to be bold/high-contrast since the
// card background is already light red, so a plain red label would blend in
export const OUTCOME_BADGE_CLASSES = {
  Offer: 'bg-green-600 text-white',
  Rejected: 'bg-red-700 text-white font-bold',
  'No Response': 'bg-gray-500 text-white',
}

// predefined pool of optional modular fields a user can attach to a job card
export const FIELD_POOL = [
  { label: 'Contact Person', type: 'text' },
  { label: 'Interview Questions', type: 'textarea' },
  { label: 'Company Website', type: 'url' },
  { label: 'Relevant Article', type: 'url' },
  { label: 'Promotion Options', type: 'text' },
  { label: 'My Questions About the Job', type: 'textarea' },
]
