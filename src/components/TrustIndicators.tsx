import { Award, Shield, CheckCircle } from 'lucide-react';

interface TrustIndicatorsProps {
    dict: any;
}

export default function TrustIndicators({ dict }: TrustIndicatorsProps) {
    const partners = [
        { icon: Award, name: 'PADI', desc: dict.trust.padi, color: 'group-hover:text-[#0073CF]' },
        { icon: Shield, name: 'DAN', desc: 'Insurance Partner', color: 'group-hover:text-[#C41230]' },
        { icon: CheckCircle, name: 'CDWS', desc: 'Certified Member', color: 'group-hover:text-[#2E8B57]' },
    ];

    return (
        <section className="py-12 bg-white border-b border-slate-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-default">
                            <partner.icon size={40} className={`text-navy ${partner.color}`} />
                            <div className="flex flex-col">
                                <span className="text-xl font-header font-bold text-navy">{partner.name}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{partner.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}