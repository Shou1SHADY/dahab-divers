import Breadcrumb from "./Breadcrumb";

interface PageHeaderProps {
    title: string;
    breadcrumbs: Array<{ href?: string; label: string }>;
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
    return (
        <div className="relative h-96 flex items-center justify-center overflow-hidden bg-navy">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/90" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
                <Breadcrumb items={breadcrumbs} />
            </div>
        </div>
    );
}