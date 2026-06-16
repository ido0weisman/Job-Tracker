// date helper utilities

// returns the number of whole days between an application date and today
export function daysSince(dateString) {
  const applied = new Date(dateString)
  const today = new Date()

  // zero out the time portion so partial days don't cause off-by-one results
  applied.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((today - applied) / msPerDay)
}

// returns the number of whole days between today and a future/past date.
// negative means the date has already passed (overdue).
export function daysUntil(dateString) {
  const target = new Date(dateString)
  const today = new Date()

  target.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((target - today) / msPerDay)
}

// turns a day count from daysUntil() into a short label + a color tone,
// so the card and showcase view can render the same wording consistently
export function describeNextStep(days) {
  if (days < 0) {
    const overdueBy = Math.abs(days)
    return { label: `Next step overdue by ${overdueBy} day${overdueBy === 1 ? '' : 's'}`, tone: 'overdue' }
  }

  if (days === 0) return { label: 'Next step today', tone: 'soon' }
  if (days === 1) return { label: 'Next step tomorrow', tone: 'soon' }
  return { label: `Next step in ${days} days`, tone: 'normal' }
}

// formats an ISO date string for nicer display, e.g. "Jun 16, 2026"
export function formatDate(dateString) {
  if (!dateString) return ''

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
