import {mockJobs} from '@/data/mockJobs';
import JobDetails from './job-details';

export async function generateMetadata({params}: {params: {id: string}}) {
    const {id} = await params;
    const job = mockJobs.find((job) => job.id === id);

    if (!job) return {title: 'Job Not Found!'};

    return {
        title: `${job.company} - ${job.title}`,
    };
}

const JobDetailsPage = async ({params}: {params: {id: string}}) => {
    const {id} = await params;

    return <JobDetails jobId={id} />;
};

export default JobDetailsPage;
