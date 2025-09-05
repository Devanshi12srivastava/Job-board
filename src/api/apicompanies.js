import { useClerkSupabaseClient } from "@/utils/supabase";

export async function getcompanies() {
  const client = useClerkSupabaseClient(); // ya phir jo client tum pass kar rahe ho
  const { data, error } = await client.from("companies").select("id,name");
  if (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
  console.log("Companies fetched:", data);
  return data;
}
