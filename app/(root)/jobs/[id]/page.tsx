import {mockJobs} from '@/data/mockJobs';
import JobDetails from './job-details';
import {Metadata} from 'next';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {id} = params;
    const job = mockJobs.find((job) => job.id === id);

    // returns false for a newly added job.
    if (!job) return {title: 'Job Not Found!'};

    return {
        title: `${job.company} - ${job.title}`,
    };
}

const JobDetailsPage = ({params}: PageProps) => {
    const {id} = params;

    return <JobDetails jobId={id} />;
};

export default JobDetailsPage;
