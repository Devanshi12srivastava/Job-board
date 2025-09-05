/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useClerkSupabaseClient } from "@/utils/supabase";
import { saveJob } from "@/api/apijob";

const JobCard = ({ job, savedInit = false, onJobSaved = () => {}, isMyJob = false, onDelete = () => {} }) => {
  const supabaseClient = useClerkSupabaseClient();
  const { user } = useUser();
  const [saved, setSaved] = useState(savedInit);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  const checkSaved = async () => {
    if (!supabaseClient || !user) return;

    const { data, error } = await supabaseClient
      .from("saved_jobs")
      .select("id")
      .eq("job_id", job.id)
      .eq("user_id", user.id)
      .maybeSingle(); // single() ki jagah maybeSingle()

    if (!error && data) setSaved(true);
    else setSaved(false);
  };

  checkSaved();
}, [supabaseClient, user, job.id]);


const handleSaveJob = async (e) => {
  e.preventDefault();
  if (!supabaseClient || !user) return;

  setLoading(true);

  // current saved value bhej rahe ho
  const data = await saveJob(
    supabaseClient,
    { alreadySaved: saved },
    { user_id: user.id, job_id: job.id }
  );

  console.log("Supabase response:", data);

  setSaved(prev => !prev); // toggle **after** API success
  setLoading(false);
  onJobSaved();
};

  const handleDeleteJob = () => {
    if (onDelete) onDelete(job.id);
  };

  return (
    <Card className="mb-4 flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold text-lg">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={18}
              className="text-red-400 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {job.company && <img src={job.company.logo_url || job.company.logo} alt={job.company.name} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        <p>{job.description}</p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
        <Button
  type="button"
  variant="outline"
  className="w-15"
  onClick={handleSaveJob}
  disabled={loading}
>
  {saved ? <Heart size={20} fill="red" stroke="red" /> : <Heart size={20} />}
</Button>

        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
