'use client';

import {useJobs} from '@/context/JobContext';
import JobCard from '@/components/JobCard';

const Jobs = () => {
    const {jobs} = useJobs();

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </section>
    );
};

export default Jobs;
