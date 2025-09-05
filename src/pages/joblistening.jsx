// Joblistening.jsx
import { useEffect, useState } from "react";
import { useClerkSupabaseClient } from "@/utils/supabase";
import { getJobs } from "@/api/apijob";
import useFetch from "@/hooks/fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/Jobcard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { State } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Joblistening = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [companies, setCompanies] = useState([]);
  
  const client = useClerkSupabaseClient();
  const { isLoaded } = useUser();

  // Fetch jobs
  const { data: jobs, loading: loadingJobs, fn: fnJobs } = useFetch(
    async () => getJobs(client, { location, company_id, searchQuery })
  );

  // Fetch companies inside useEffect
  useEffect(() => {
    if (isLoaded && client) {
      const fetchCompanies = async () => {
        const { data, error } = await client.from("companies").select("id,name");
        if (error) {
          console.error("Error fetching companies:", error);
        } else {
          console.log("Companies fetched:", data);
          setCompanies(data);
        }
      };
      fetchCompanies();
    }
  }, [isLoaded, client]);

  useEffect(() => {
    if (isLoaded && client) fnJobs();
  }, [location, company_id, searchQuery, client, isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query || "");
  };
const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="green" />;
  }

  return (
    <div>
      <h1 className="text-white font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="search.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex gap-4 mb-4">
        {/* Location Select */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company Select */}
        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.length > 0 ? (
                companies.map(({ id, name }) => (
                  <SelectItem key={id} value={id.toString()}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No companies found</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
         <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && <BarLoader className="mt-4" width={"100%"} color="green" />}

      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <Jobcard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
            ))
          ) : (
            <div>No Jobs Found ☹️</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblistening;
