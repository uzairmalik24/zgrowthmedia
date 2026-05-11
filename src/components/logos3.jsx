import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

// Replace each `image` with the real client logo (SVG/PNG) once provided.
// Drop the files into /public/images/clients/ and update the paths.
const logos = [
  { id: "logo-twinspires", description: "TwinSpires",   image: "/images/clients/twinspires.svg" },
  { id: "logo-prbytes",    description: "PR Bytes",     image: "/images/clients/pr-bytes.svg"   },
  { id: "logo-client-3",   description: "{{Client 3}}", image: "/images/clients/client-3.svg"   },
  { id: "logo-client-4",   description: "{{Client 4}}", image: "/images/clients/client-4.svg"   },
  { id: "logo-client-5",   description: "{{Client 5}}", image: "/images/clients/client-5.svg"   },
  { id: "logo-client-6",   description: "{{Client 6}}", image: "/images/clients/client-6.svg"   },
  { id: "logo-client-7",   description: "{{Client 7}}", image: "/images/clients/client-7.svg"   },
];

const Logos3 = ({ heading = "Trusted by these companies" }) => {
  return (
    <section className="py-20">
      <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.2 })]}
          className="w-full"
        >
          <CarouselContent style={{ margin: 0, display: "flex", alignItems: "center" }}>
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                style={{
                  paddingLeft: 0,
                  flexShrink: 0,
                  flexGrow: 0,
                  flexBasis: "auto",
                  width: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo.image}
                  alt={logo.description}
                  style={{
                    height: "28px",
                    width: "auto",
                    maxWidth: "130px",
                    objectFit: "contain",
                    opacity: 0.6,
                    filter: "grayscale(100%)",
                    transition: "opacity 0.2s, filter 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.filter = "grayscale(100%)";
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export { Logos3 };