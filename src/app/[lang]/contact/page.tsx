import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import BookingForm from "@/components/BookingForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-gray-50">
            <PageHeader
                title={dict.nav.contact}
                breadcrumbs={[{ label: dict.nav.contact }]}
            />

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <SectionTitle title={dict.contact.info.title} subtitle={dict.contact.info.subtitle} />
                            <div className="space-y-8 mt-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-turquoise" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{dict.contact.info.location.title}</h3>
                                        <p className="text-gray-600">{dict.contact.info.location.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-turquoise" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{dict.contact.info.phone.title}</h3>
                                        <p className="text-gray-600">{dict.contact.info.phone.number}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-turquoise" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{dict.contact.info.email.title}</h3>
                                        <p className="text-gray-600">{dict.contact.info.email.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-turquoise" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{dict.contact.info.hours.title}</h3>
                                        <p className="text-gray-600">{dict.contact.info.hours.time}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-12 h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                                    Google Maps Placeholder
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div>
                            <SectionTitle title={dict.contact.booking.title} subtitle={dict.contact.booking.subtitle} />
                            <BookingForm dict={dict} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
