import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * This function getLocationBadgeVariant takes a string type as input and returns a string representing a badge variant based on the input type. The mapping is as follows:
 * 'Remote' -> 'default'
 * 'Hybrid' -> 'secondary'
 * 'On-site' -> 'outline'
 * Any other type -> 'secondary'
 * @param type string
 * @returns string
 */
export const getLocationBadgeVariant = (type: string) => {
    switch (type) {
        case 'Remote':
            return 'default';
        case 'Hybrid':
            return 'secondary';
        case 'On-site':
            return 'outline';
        default:
            return 'secondary';
    }
};

/**
 * Function to format a date string as "Month Day, Year"
 * @param dateString
 * @returns date in the "Month Day, Year" (e.g., "January 12, 2022"),
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
