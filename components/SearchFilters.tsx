'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Card, CardContent} from '@/components/ui/card';
import {Search, Filter, X} from 'lucide-react';
import {useJobs} from '@/context/JobContext';

const SearchFilters = () => {
    const {filters, setFilters} = useJobs();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSearchChange = (value: string) => {
        setFilters({search: value});
    };

    const handleLocationChange = (value: string) => {
        setFilters({location: value === 'all' ? '' : value});
    };

    const handleTypeChange = (value: string) => {
        setFilters({type: value === 'all' ? '' : value});
    };

    const clearFilters = () => {
        setFilters({search: '', location: '', type: '', company: ''});
    };

    const hasActiveFilters =
        filters.search || filters.location || filters.type || filters.company;

    return (
        <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Search jobs, companies, or technologies..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 h-12 text-base"
                />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            !
                        </span>
                    )}
                </Button>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4 mr-1" />
                        Clear filters
                    </Button>
                )}
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Location
                                </label>
                                <Select
                                    value={filters.location || 'all'}
                                    onValueChange={handleLocationChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Any location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Any location
                                        </SelectItem>
                                        <SelectItem value="Lagos">
                                            Lagos
                                        </SelectItem>
                                        <SelectItem value="Abuja">
                                            Abuja
                                        </SelectItem>
                                        <SelectItem value="Port Harcourt">
                                            Port-Harcourt
                                        </SelectItem>
                                        <SelectItem value="Ibadan">
                                            Ibadan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Work Type
                                </label>
                                <Select
                                    value={filters.type || 'all'}
                                    onValueChange={handleTypeChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Any type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Any type
                                        </SelectItem>
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
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SearchFilters;
