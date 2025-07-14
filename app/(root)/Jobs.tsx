'use client';

import {useJobs} from '@/context/JobContext';
import JobCard from '@/components/JobCard';
import {Card, CardContent} from '@/components/ui/card';
import {Briefcase} from 'lucide-react';

const Jobs = () => {
    const {getFilteredJobs} = useJobs();
    const filteredJobs = getFilteredJobs();

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No jobs found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search criteria or clearing the
                            filters.
                        </p>
                    </CardContent>
                </Card>
            )}
        </section>
    );
};

export default Jobs;
