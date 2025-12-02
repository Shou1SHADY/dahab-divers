import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    center?: boolean;
}

export default function SectionTitle({ title, subtitle, className, center = false }: SectionTitleProps) {
    return (
        <div className={cn("mb-12", center && "text-center", className)}>
            {subtitle && (
                <span className="text-turquoise text-sm font-bold uppercase tracking-widest mb-2 block">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-navy relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full" />
            </h2>
        </div>
    );
}
