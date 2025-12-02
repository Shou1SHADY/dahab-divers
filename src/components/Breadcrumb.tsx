import Link from 'next/link';

interface BreadcrumbProps {
    items: Array<{ href?: string; label: string }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    // Handle case where items might be undefined
    if (!items || !Array.isArray(items)) {
        return null;
    }

    return (
        <nav className="flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        )}
                        {item.href ? (
                            <Link href={item.href} className="text-sm font-medium text-gray-300 hover:text-white">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-sm font-medium text-turquoise">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}