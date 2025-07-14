'use client';

import {createContext, useContext, useState} from 'react';
import {mockJobs} from '@/data/mockJobs';
import {Job, JobFilters} from '@/types/job';

interface JobContextType {
    jobs: Job[];
    getJobById: (id: string) => Job | undefined;
    addJob: (jobData: Omit<Job, 'id' | 'postedDate'>) => void;
    filters: JobFilters;
    setFilters: (filters: Partial<JobFilters>) => void;
    getFilteredJobs: () => Job[];
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({children}: {children: React.ReactNode}) => {
    const [jobs, setJobs] = useState(mockJobs);

    // filters
    const [filters, setFiltersState] = useState<JobFilters>({
        search: '',
        location: '',
        type: '',
        company: '',
    });

    // set filters
    const setFilters = (newFilters: Partial<JobFilters>) => {
        setFiltersState((prev) => ({...prev, ...newFilters}));
    };

    /**
     *  filters a list of jobs based on search criteria.
     * It checks if a job matches the search query, location, job type, and company, and returns an array of jobs that match all these criteria.
     * @returns an array [jobs]
     */
    const getFilteredJobs = () => {
        return jobs.filter((job) => {
            const search = filters.search.toLowerCase();
            const matchesSearch =
                !search ||
                job.title.toLowerCase().includes(search) ||
                job.company.toLowerCase().includes(search) ||
                job.tags.some((tag) => tag.toLowerCase().includes(search));

            const matchesLocation =
                !filters.location ||
                job.location
                    .toLowerCase()
                    .includes(filters.location.toLowerCase());

            const matchesType = !filters.type || job.type === filters.type;

            const matchesCompany =
                !filters.company ||
                job.company
                    .toLowerCase()
                    .includes(filters.company.toLowerCase());

            return (
                matchesSearch &&
                matchesLocation &&
                matchesType &&
                matchesCompany
            );
        });
    };

    const addJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
        const newJob: Job = {
            ...jobData,
            id: `job_${Date.now()}_${Math.random()
                .toString(36)
                .substring(2, 9)}`,
            postedDate: new Date().toISOString().split('T')[0],
        };
        setJobs((prev) => [newJob, ...prev]);
    };

    const getJobById = (id: string) => {
        return jobs.find((job) => job.id === id);
    };

    return (
        <JobContext.Provider
            value={{
                jobs,
                getJobById,
                addJob,
                filters,
                setFilters,
                getFilteredJobs,
            }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
};
