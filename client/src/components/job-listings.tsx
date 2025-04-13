import { JobCard } from "./job-card";
import { defaultJobs } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export function JobListings() {
  const { data: jobListings = defaultJobs } = useQuery({
    queryKey: ['/api/jobs'],
  });

  return (
    <section id="vi-tri" className="container mx-auto px-4 py-12 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center text-whatsapp-green mb-8">Vị Trí Tuyển Dụng Marketing</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(jobListings) ? jobListings.map((job) => (
          <JobCard key={job.id} job={job} />
        )) : defaultJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
