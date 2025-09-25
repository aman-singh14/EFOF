import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Brief | EFOF',
  description: 'EFOF Brief - Our comprehensive overview document',
};

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Logo in top left */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="md" priority />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="sm" priority />
        </Link>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-8 text-center">
            EFOF Brief
          </h1>
          
          <p className="text-gray-700 text-center mb-8">
            View our comprehensive brief document below. If the PDF doesn't load, you can{' '}
            <a 
              href="/documents/EFOF Brief-2.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              download it directly
            </a>.
          </p>

          {/* PDF Embed */}
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="/documents/EFOF Brief-2.pdf"
              className="w-full h-[800px] border-0"
              title="EFOF Brief Document"
              loading="lazy"
            >
              <p className="p-8 text-center text-gray-600">
                Your browser doesn't support PDF viewing. Please{' '}
                <a 
                  href="/documents/EFOF Brief-2.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  download the PDF
                </a>{' '}
                to view it.
              </p>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}