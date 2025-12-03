"use client";

import { Image as ImageIcon, Users, MapPin, Compass, Clock, Wrench, ClipboardCheck, ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  stats?: string[];
  price?: number;
  duration?: string;
  equipment?: string;
  requirements?: string;
  image?: string;
}

interface ShowcaseProps {
  title: string;
  subtitle: string;
  items: ShowcaseItem[];
}

// Custom Diver Icon
const DiverIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    <path d="M18 11.45a7.41 7.41 0 0 0-1.07-3.79" />
    <path d="M6 11.45a7.41 7.41 0 0 1 1.07-3.79" />
    <path d="M12 14v4" />
    <path d="M12 18h-4l-1 4h10l-1-4h-4z" />
    <path d="M4.22 18.78l-1.41 1.41" />
    <path d="M19.78 18.78l1.41 1.41" />
  </svg>
);

const InfoBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-turquoise/5 to-navy/5 rounded-md border border-turquoise/10">
    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-turquoise to-navy rounded-full flex items-center justify-center shadow">
      {icon}
    </div>
    <p className="text-xs text-gray-700 font-medium">{text}</p>
  </div>
);

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Image":
      return ImageIcon;
    case "Users":
      return Users;
    case "MapPin":
      return MapPin;
    case "Compass":
      return Compass;
    default:
      return ImageIcon;
  }
};

export default function Showcase({ title, subtitle, items }: ShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];
  const CurrentIcon = getIconComponent(currentItem.icon);

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-8 md:py-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-turquoise/5 via-transparent to-navy/5" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-turquoise/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-turquoise to-navy rounded-full mb-4 shadow-xl">
            <DiverIcon className="text-white w-8 h-8"/>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] bg-gradient-to-br from-turquoise/10 to-navy/10">
                {currentItem.image ? (
                  <img
                    src={currentItem.image.startsWith('http') ? currentItem.image : currentItem.image.replace(/^\//, '/')}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="absolute top-6 right-6 w-16 h-16 bg-turquoise rounded-full blur-2xl" />
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-navy rounded-full blur-xl" />
                    <div className="relative z-10 w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-turquoise/20">
                      <CurrentIcon className="text-turquoise" size={48} />
                    </div>
                  </div>
                )}
                
                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content Side */}
              <div className="p-5 md:p-6 flex flex-col relative bg-gradient-to-br from-white to-gray-50">
                {/* Price Badge */}
                <div className="absolute top-3 right-3 w-28 h-28 overflow-hidden pointer-events-none">
                  <div className="absolute top-6 -right-8 w-36 bg-gradient-to-r from-turquoise to-navy text-white text-center font-bold py-1 transform rotate-45 text-sm shadow-lg">
                    €{currentItem.price || 99}
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-navy mb-1 pr-12">{currentItem.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-600 text-xs ml-1">(4.9/5.0)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  <InfoBadge icon={<Clock className="w-3 h-3 text-white" />} text={currentItem.stats?.[0] || "Duration: Half Day"} />
                  <InfoBadge icon={<Wrench className="w-3 h-3 text-white" />} text={currentItem.stats?.[1] || "Equipment included"} />
                  <InfoBadge icon={<ClipboardCheck className="w-3 h-3 text-white" />} text={currentItem.stats?.[2] || "All levels welcome"} />
                </div>

                <div className="flex-grow">
                  <p className="text-gray-600 leading-relaxed mb-2 text-xs">
                    {currentItem.description}
                  </p>
                  <p className="text-xs text-turquoise font-medium mb-2">
                    <ArrowRight className="inline w-3 h-3 mr-1" />
                    Click on the course name to find more info
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="bg-gradient-to-r from-turquoise to-navy hover:from-turquoise/90 hover:to-navy/90 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow text-xs">
                    Book Now
                  </button>
                  <button className="border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 text-xs">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-turquoise/20 text-turquoise hover:bg-turquoise hover:text-white transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-turquoise/20 text-turquoise hover:bg-turquoise hover:text-white transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Enhanced Thumbnail Gallery */}
        <div className="mt-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-turquoise scrollbar-track-transparent">
            {items.map((item, index) => {
              const ThumbnailIcon = getIconComponent(item.icon);
              
              return (
                <div 
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    index === currentIndex 
                      ? 'ring-4 ring-turquoise shadow-xl scale-105' 
                      : 'opacity-70 hover:opacity-100 shadow-lg'
                  }`}
                >
                  {item.image ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={item.image.startsWith('http') ? item.image : item.image.replace(/^\//, '/')}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded">
                        {item.title}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-turquoise/10 to-navy/10 flex items-center justify-center">
                      <ThumbnailIcon className="text-turquoise" size={32} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mt-3 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 h-2 bg-gradient-to-r from-turquoise to-navy rounded-full' 
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-turquoise/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
