'use client';

import {createContext, useContext, useState} from 'react';
import {mockJobs} from '@/data/mockJobs';
import {Job} from '@/types/job';

interface JobContextType {
    jobs: Job[];
    getJobById: (id: string) => Job | undefined;
    addJob: (jobData: Omit<Job, 'id' | 'postedDate'>) => void;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({children}: {children: React.ReactNode}) => {
    const [jobs, setJobs] = useState(mockJobs);

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
