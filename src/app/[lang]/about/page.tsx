import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import Stats from "@/components/Stats";
import teamData from "@/data/team.json";
import Image from "next/image";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen">
            <PageHeader
                title={dict.nav.about}
                breadcrumbs={[{ label: dict.nav.about }]}
                backgroundImage="/images/about-header-bg.png"
                roundedBottom={true}
            />

            {/* History & Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionTitle title={dict.about.story.title} subtitle={dict.about.story.subtitle} />
                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <p>
                                    {dict.about.story.paragraphs[0]}
                                </p>
                                <p>
                                    {dict.about.story.paragraphs[1]}
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                                alt="Diving Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Stats dict={dict} />
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle title={dict.about.team.title} subtitle={dict.about.team.subtitle} center />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {teamData.map((member) => (
                            <div key={member.id} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-gray-100 group-hover:border-turquoise transition-colors">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                                <p className="text-turquoise font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
