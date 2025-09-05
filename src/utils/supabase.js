// src/utils/supabase.js
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Custom hook
export function useClerkSupabaseClient() {
  const { session } = useSession();
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!session) return;

    const supabaseClient = createClient(supabaseUrl, supabaseKey, {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session.getToken({ template: "supabase" });
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);
          return fetch(url, { ...options, headers });
        },
      },
    });

    setClient(supabaseClient);
  }, [session]);

  return client;
}
