import { Award, Users, Shield, MapPin } from 'lucide-react';

interface StatsProps {
    dict: any;
}

export default function Stats({ dict }: StatsProps) {
    const stats = [
        { id: 1, value: '15k+', label: dict.stats.divers, icon: Award },
        { id: 2, value: '5k+', label: dict.stats.experience, icon: Users },
        { id: 3, value: '20+', label: dict.stats.sites, icon: Shield },
        { id: 4, value: '50+', label: dict.stats.instructors, icon: MapPin },
    ];

    return (
        <section className="py-24 bg-navy text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
                    {stats.map((stat) => (
                        <div key={stat.id} className="p-4">
                            <div className="text-5xl md:text-6xl font-header font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-xs uppercase tracking-[0.2em] text-turquoise font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}