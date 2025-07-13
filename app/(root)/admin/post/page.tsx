'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Plus, X, Briefcase} from 'lucide-react';
import {JobForm} from '@/types/job';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {useJobs} from '@/context/JobContext';

const PostJob = () => {
    const router = useRouter();
    const {addJob} = useJobs();

    const [form, setForm] = useState<JobForm>({
        title: '',
        company: '',
        location: '',
        type: '',
        salaryRange: '',
        description: '',
        requirements: [''],
        benefits: [''],
        applyUrl: '',
        tags: [''],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!form.title.trim()) newErrors.title = 'Job title is required';
        if (!form.company.trim())
            newErrors.company = 'Company name is required';
        if (!form.location.trim()) newErrors.location = 'Location is required';
        if (!form.type) newErrors.type = 'Work type is required';
        if (!form.description.trim())
            newErrors.description = 'Job description is required';

        const validRequirements = form.requirements.filter((req) => req.trim());
        if (validRequirements.length === 0) {
            newErrors.requirements = 'At least one requirement is needed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast('Validation Error', {
                description: 'Please fix the errors in the form.',
            });
            return;
        }

        const jobData = {
            ...form,
            type: form.type as 'Remote' | 'Hybrid' | 'On-site',
            requirements: form.requirements.filter((req) => req.trim()),
            benefits: form.benefits.filter((benefit) => benefit.trim()),
            tags: form.tags.filter((tag) => tag.trim()),
        };

        addJob(jobData);

        toast('Success!', {
            description: 'Job posted successfully.',
        });

        router.push('/');
    };

    const addListItem = (field: 'requirements' | 'benefits' | 'tags') => {
        setForm((prev) => ({
            ...prev,
            [field]: [...prev[field], ''],
        }));
    };

    const removeListItem = (
        field: 'requirements' | 'benefits' | 'tags',
        index: number
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const updateListItem = (
        field: 'requirements' | 'benefits' | 'tags',
        index: number,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? value : item)),
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold">Post a New Job</h1>
                        <p className="text-muted-foreground mt-2">
                            Find the perfect candidate for your remote tech role
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Job Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            value={form.title}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))
                                            }
                                            placeholder="e.g. Senior Frontend Developer"
                                            className={
                                                errors.title
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">
                                            Company Name *
                                        </Label>
                                        <Input
                                            id="company"
                                            value={form.company}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    company: e.target.value,
                                                }))
                                            }
                                            placeholder="e.g. TechFlow Inc."
                                            className={
                                                errors.company
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.company && (
                                            <p className="text-sm text-destructive">
                                                {errors.company}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location">
                                            Location *
                                        </Label>
                                        <Input
                                            id="location"
                                            value={form.location}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    location: e.target.value,
                                                }))
                                            }
                                            placeholder="e.g. Lagos, LG"
                                            className={
                                                errors.location
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.location && (
                                            <p className="text-sm text-destructive">
                                                {errors.location}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">
                                            Work Type *
                                        </Label>
                                        <Select
                                            value={form.type}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            onValueChange={(value: any) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    type: value,
                                                }))
                                            }>
                                            <SelectTrigger
                                                className={
                                                    errors.type
                                                        ? 'border-destructive'
                                                        : ''
                                                }>
                                                <SelectValue placeholder="Select work type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Remote">
                                                    Remote
                                                </SelectItem>
                                                <SelectItem value="Hybrid">
                                                    Hybrid
                                                </SelectItem>
                                                <SelectItem value="On-site">
                                                    On-site
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <p className="text-sm text-destructive">
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="salary">
                                            Salary Range
                                        </Label>
                                        <Input
                                            id="salary"
                                            value={form.salaryRange}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    salaryRange: e.target.value,
                                                }))
                                            }
                                            placeholder="e.g. ₦500k - ₦600k"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="applyUrl">
                                            Application URL
                                        </Label>
                                        <Input
                                            id="applyUrl"
                                            type="url"
                                            value={form.applyUrl}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    applyUrl: e.target.value,
                                                }))
                                            }
                                            placeholder="https://company.com/apply"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Job Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                                        rows={4}
                                        className={
                                            errors.description
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Requirements */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Requirements *</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                addListItem('requirements')
                                            }>
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {form.requirements.map((req, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2">
                                                <Input
                                                    value={req}
                                                    onChange={(e) =>
                                                        updateListItem(
                                                            'requirements',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. 5+ years of React experience"
                                                />
                                                {form.requirements.length >
                                                    1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeListItem(
                                                                'requirements',
                                                                index
                                                            )
                                                        }>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.requirements && (
                                        <p className="text-sm text-destructive">
                                            {errors.requirements}
                                        </p>
                                    )}
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Benefits</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                addListItem('benefits')
                                            }>
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {form.benefits.map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2">
                                                <Input
                                                    value={benefit}
                                                    onChange={(e) =>
                                                        updateListItem(
                                                            'benefits',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Health insurance"
                                                />
                                                {form.benefits.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeListItem(
                                                                'benefits',
                                                                index
                                                            )
                                                        }>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Skills & Technologies</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addListItem('tags')}>
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {form.tags.map((tag, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2">
                                                <Input
                                                    value={tag}
                                                    onChange={(e) =>
                                                        updateListItem(
                                                            'tags',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. React"
                                                />
                                                {form.tags.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeListItem(
                                                                'tags',
                                                                index
                                                            )
                                                        }>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex gap-4">
                                    <Button type="submit" className="flex-1">
                                        Post Job
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push('/')}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
