import {mockJobs} from '@/data/mockJobs';
import JobDetails from './job-details';
import {Metadata} from 'next';

type Props = {
    params: Promise<{id: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    // read route params
    const {id} = await params;

    // fetch job
    const job = mockJobs.find((job) => job.id === id);

    // TODO: If new job is added, this returns undefined because the job is not in the mockJobs array rather in memory.
    if (!job) {
        return {
            title: 'Job not found',
        };
    }

    return {
        title: `${job.title} | ${job.company}`,
    };
}

const JobDetailsPage = async ({params}: Props) => {
    const {id} = await params;

    return <JobDetails jobId={id} />;
};

export default JobDetailsPage;
