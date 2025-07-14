export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Remote' | 'Hybrid' | 'On-site';
    salaryRange?: string;
    description: string;
    requirements: string[];
    benefits: string[];
    postedDate: string;
    applyUrl?: string;
    tags: string[];
}

export interface JobForm {
    title: string;
    company: string;
    location: string;
    type: 'Remote' | 'Hybrid' | 'On-site' | '';
    salaryRange: string;
    description: string;
    requirements: string[];
    benefits: string[];
    applyUrl: string;
    tags: string[];
}

export interface JobFilters {
    search: string;
    location: string;
    type: string;
    company: string;
}
