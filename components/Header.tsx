'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/components/ThemeToggle';
import {Briefcase, Plus} from 'lucide-react';
import {usePathname} from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            RemoteJobs
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Button
                            variant={isActive('/') ? 'default' : 'ghost'}
                            asChild
                            className="px-4">
                            <Link href="/">
                                <Briefcase className="w-4 h-4 mr-2" />
                                Jobs
                            </Link>
                        </Button>

                        <Button
                            variant={
                                isActive('/admin/post') ? 'default' : 'ghost'
                            }
                            asChild
                            className="px-4">
                            <Link href="/admin/post">
                                <Plus className="w-4 h-4 mr-2" />
                                Post Job
                            </Link>
                        </Button>
                    </nav>

                    {/* Theme Toggle & Mobile Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <div className="md:hidden">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/post">
                                    <Plus className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
