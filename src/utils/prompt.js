// builds a research prompt out of the "dry" fields already filled in for a job.
// the idea: the user fills in what they already know (company, role, source),
// and this assembles a prompt asking an AI to fill in the rest (background
// research, interview prep, and any other field they've added but left empty).
// the prompt itself is written in hebrew, and asks for 2-3 lines per requested field.
export function buildPrompt(job) {
  const knownLines = [`חברה: ${job.company_name}`, `תפקיד: ${job.role_name}`]

  if (job.source) knownLines.push(`איפה מצאתי את המשרה: ${job.source}`)
  if (job.company_background) knownLines.push(`רקע על החברה (כבר ידוע לי): ${job.company_background}`)
  if (job.role_background) knownLines.push(`רקע על התפקיד (כבר ידוע לי): ${job.role_background}`)

  const requestLines = []
  if (!job.company_background) {
    requestLines.push('רקע על החברה: מה החברה עושה, גודלה, התרבות הארגונית וחדשות עדכניות.')
  }
  if (!job.role_background) {
    requestLines.push('רקע על התפקיד: מה כולל התפקיד ביום-יום ואילו כישורים/ניסיון הוא דורש.')
  }
  requestLines.push('שאלות ראיון צפויות לתפקיד הזה, וכיצד להתכונן אליהן.')

  for (const field of job.dynamic_fields ?? []) {
    if (!field.value) {
      requestLines.push(field.label)
    }
  }

  return [
    'אני מתכונן למשרה הזו. הנה מה שאני כבר יודע:',
    '',
    ...knownLines,
    '',
    'אנא חקור והשב על הנושאים הבאים, כל אחד ב-2-3 שורות:',
    ...requestLines.map((line) => `- ${line}`),
    '',
    'התחל את הסיכום במילה בעברית.',
  ].join('\n')
}
