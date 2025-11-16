import { useRef } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import slides from "./SlidesData.jsx";

const Hero = () => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {

  }

  const handleMouseLeave = () => {
    
  } 

  return <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          speed={1000}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-[90vh]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='relative h-full'>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
              {/* <div className="absolute inset-0 bg-black bg-opacity-40" /> */}
              
               <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-3xl text-white text-center mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="px-8 py-4 font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-white text-black hover:bg-yellow-600 hover:text-white"
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
        ))}

          {/* Navigation Elements */}
          <div className="swiper-button-next"/>
          <div className="swiper-button-prev"/>
          
          {/* Pagination */}
          <div className="swiper-pagination" style={{ bottom: '32px' }} />


      </Swiper>
    </section>;
};

export default Hero;
