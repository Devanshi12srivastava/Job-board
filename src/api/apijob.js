import { SupabaseClient } from "@supabase/supabase-js";

// apijob.js
export async function getJobs(client, { location, company_id, searchQuery } = {}) {
  if (!client) return null;

  let query = client.from("Jobs").select(`
    *,
    company:companies(name,logo),
    saved_jobs(
      id,
      user_id
    )
  `);

  if (location) query = query.eq("location", location);
  if (company_id) query = query.eq("company_id", company_id);
  if (searchQuery) query = query.ilike("titile", `%${searchQuery}%`);

  const { data, error } = await query;
  console.log("data:", data);
  console.log("error:", error);
  console.log("jobs with company:", data, error);

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }
  return data;
}

// saveJob function intact with better error handling
export async function saveJob(client, { alreadySaved }, saveData) {
  if (!client) return null;

  if (alreadySaved) {
    const { data, error: deleteError } = await client
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
      .eq("user_id", saveData.user_id);

    if (deleteError) {
      console.error("Error deleting saved jobs:", deleteError);
      return null;
    }
    console.log("Deleted saved job:", data);
    return data;
  } else {
    const { data, error: insertError } = await client
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error inserting saved job:", insertError);
      return null;
    }
    console.log("Inserted saved job:", data);
    return data;
  }
}
