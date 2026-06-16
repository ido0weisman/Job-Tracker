import { supabase } from '../lib/supabaseClient'

const TABLE = 'jobs'

// all CRUD operations for the jobs table live here, so components never
// talk to supabase directly. keeps the data layer swappable and testable.

export async function fetchJobs() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createJob(job) {
  const { data, error } = await supabase.from(TABLE).insert(job).select().single()

  if (error) throw error
  return data
}

export async function updateJob(id, changes) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(changes)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteJob(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
