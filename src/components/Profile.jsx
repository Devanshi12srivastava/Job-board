import React, { useEffect, useState } from 'react';
import { useClerkSupabaseClient } from '../utils/supabase';

function Profile() {
  const client = useClerkSupabaseClient();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!client) return;

    async function fetchProfiles() {
      const { data, error } = await client
        .from('user')
        .select('*');
      if (error) console.error(error);
      else setProfiles(data);
    }

    fetchProfiles();
  }, [client]);

  return (
    <div>
      <h1>User Profiles</h1>
      <pre>{JSON.stringify(profiles, null, 2)}</pre>
    </div>
  );
}

export default Profile;
