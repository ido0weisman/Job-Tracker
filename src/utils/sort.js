import { daysSince } from './dates'

// sorting options for the jobs inside a single kanban column.
// "default" keeps whatever order the jobs were fetched in (oldest created first).
export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'days_since_applied_asc', label: 'Days Since Applied (Low to High)' },
  { value: 'days_since_applied_desc', label: 'Days Since Applied (High to Low)' },
  { value: 'rating', label: 'Star Rating' },
  { value: 'company_az', label: 'Company (A-Z)' },
]

// returns a new, sorted array - never mutates the input
export function sortJobs(jobs, sortBy) {
  if (sortBy === 'days_since_applied_asc') {
    return [...jobs].sort((a, b) => daysSince(a.application_date) - daysSince(b.application_date))
  }

  if (sortBy === 'days_since_applied_desc') {
    return [...jobs].sort((a, b) => daysSince(b.application_date) - daysSince(a.application_date))
  }

  if (sortBy === 'rating') {
    // highest rating first; unrated jobs sink to the bottom
    return [...jobs].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  }

  if (sortBy === 'company_az') {
    return [...jobs].sort((a, b) =>
      a.company_name.localeCompare(b.company_name, undefined, { sensitivity: 'base' }),
    )
  }

  return jobs
}
