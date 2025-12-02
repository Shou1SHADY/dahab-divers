import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, Search, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-turquoise mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-300 mb-8">
            The underwater page you&apos;re looking for seems to have drifted away...
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-navy">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="bg-navy-light rounded-xl p-6 text-left">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <Search className="w-5 h-5 mr-2 text-turquoise" />
              Looking for something specific?
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Check out our <Link href="/diving" className="text-turquoise hover:underline">Diving Packages</Link></li>
              <li>• Explore our <Link href="/courses" className="text-turquoise hover:underline">PADI Courses</Link></li>
              <li>• Learn <Link href="/about" className="text-turquoise hover:underline">About Our Team</Link></li>
              <li>• Visit our <Link href="/contact" className="text-turquoise hover:underline">Contact Page</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-gray-400 text-sm">
          <p>If you believe this is an error, please contact our team.</p>
        </div>
      </div>
    </div>
  );
}
