import Breadcrumb from "./Breadcrumb";

interface PageHeaderProps {
    title: string;
    breadcrumbs: Array<{ href?: string; label: string }>;
    backgroundImage?: string;
    roundedBottom?: boolean;
}

export default function PageHeader({ title, breadcrumbs, backgroundImage, roundedBottom }: PageHeaderProps) {
    return (
        <div
            className="relative h-96 flex items-center justify-center overflow-hidden bg-navy"
            style={{
                ...(backgroundImage ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } : {}),
                ...(roundedBottom ? {
                    borderRadius: '0 0 50% 50% / 0 0 clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)'
                } : {})
            }}
        >
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-b ${backgroundImage ? 'from-navy/30 via-navy/20 to-navy/60' : 'from-navy/60 via-transparent to-navy/90'}`} />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
                <Breadcrumb items={breadcrumbs} />
            </div>
        </div>
    );
}