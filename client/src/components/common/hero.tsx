import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <img src="https://static.wixstatic.com/media/539a77_025347a432694ac89e5f409fa5a68ccb~mv2.jpg/v1/fill/w_1897,h_634,fp_0.49_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/539a77_025347a432694ac89e5f409fa5a68ccb~mv2.jpg" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://static.wixstatic.com/media/539a77_cef236f6c3804bbd8505c63657465c68~mv2.jpg/v1/fill/w_1897,h_634,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/539a77_cef236f6c3804bbd8505c63657465c68~mv2.jpg" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://static.wixstatic.com/media/539a77_82ff956666a84db2bfaf93a59a5bedb7~mv2.jpg/v1/fill/w_1897,h_726,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/539a77_82ff956666a84db2bfaf93a59a5bedb7~mv2.jpg" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
