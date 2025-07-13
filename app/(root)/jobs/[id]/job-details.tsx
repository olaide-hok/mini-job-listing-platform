'use client';

import {useJobs} from '@/context/JobContext';
import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import {
    ArrowLeft,
    Building2,
    CheckCircle,
    Clock,
    DollarSign,
    ExternalLink,
    Gift,
    MapPin,
} from 'lucide-react';
import {formatDate, getLocationBadgeVariant} from '@/lib/utils';

interface JobDetailsProps {
    jobId: string;
}

const JobDetails = ({jobId}: JobDetailsProps) => {
    const {getJobById} = useJobs();

    if (!jobId) {
        return <div>Job not found</div>;
    }

    const job = getJobById(jobId);

    if (!job) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Card className="text-center py-12">
                        <CardContent>
                            <h2 className="text-2xl font-bold mb-4">
                                Job Not Found
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                The job you&apos;re looking for doesn&apos;t
                                exist or has been removed.
                            </p>
                            <Button asChild>
                                <Link href="/">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Jobs
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Jobs
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="w-5 h-5 text-muted-foreground" />
                                            <span className="text-lg font-medium text-muted-foreground">
                                                {job.company}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-foreground mb-4">
                                            {job.title}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{job.location}</span>
                                            </div>

                                            {job.salaryRange && (
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span>
                                                        {job.salaryRange}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    Posted{' '}
                                                    {formatDate(job.postedDate)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge
                                        variant={getLocationBadgeVariant(
                                            job.type
                                        )}
                                        className="ml-4">
                                        {job.type}
                                    </Badge>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Job Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About the Role</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {job.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {job.requirements.map(
                                        (requirement, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">
                                                    {requirement}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Gift className="w-5 h-5" />
                                    Benefits & Perks
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2">
                                            <Gift className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ready to Apply?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Join {job.company} and help build the future
                                    of technology.
                                </p>

                                {job.applyUrl ? (
                                    <Button className="w-full" asChild>
                                        <a
                                            href={job.applyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Apply Now
                                        </a>
                                    </Button>
                                ) : (
                                    <Button className="w-full" disabled>
                                        Application Coming Soon
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Skills/Tags */}
                        {job.tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Skills & Technologies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Company Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5" />
                                    About {job.company}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {job.company} is a leading technology
                                    company focused on innovation and growth.
                                    Join our team and be part of something
                                    amazing.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
