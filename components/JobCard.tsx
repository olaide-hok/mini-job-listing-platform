import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Job} from '@/types/job';
import {MapPin, Building2, DollarSign, Clock} from 'lucide-react';
import Link from 'next/link';
import {getLocationBadgeVariant} from '@/lib/utils';

interface JobCardProps {
    job: Job;
}
const JobCard = ({job}: JobCardProps) => {
    return (
        <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {job.company}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                        </h3>
                    </div>
                    <Badge
                        variant={getLocationBadgeVariant(job.type)}
                        className="ml-2">
                        {job.type}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pb-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                    </div>

                    {job.salaryRange && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salaryRange}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {/* <span>Posted {formatDate(job.postedDate)}</span> */}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                    </p>

                    {job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {job.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {job.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{job.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default JobCard;
