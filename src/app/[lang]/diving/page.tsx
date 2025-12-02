import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import PageHeader from "@/components/PageHeader";
import DivingContent from "@/components/DivingContent";

export default async function DivingPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-gray-50">
            <PageHeader
                title={dict.nav.diving}
                breadcrumbs={[{ label: dict.nav.diving }]}
            />
            <DivingContent lang={lang} dict={dict} />
        </main>
    );
}