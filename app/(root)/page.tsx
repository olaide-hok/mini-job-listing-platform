import SearchFilters from '@/components/SearchFilters';
import Jobs from './Jobs';

const Homepage = async () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background via-primary/5 to-accent/5 dark:via-primary/10 dark:to-accent/10 border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center space-y-4 mb-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Find Your Dream{' '}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Remote Tech Job
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover amazing opportunities from top companies
                            worldwide. Work from anywhere, build the future of
                            technology.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-2xl mx-auto">
                        <SearchFilters />
                    </div>
                </div>
            </section>
            {/* Jobs Section */}
            <Jobs />
        </div>
    );
};

export default Homepage;
