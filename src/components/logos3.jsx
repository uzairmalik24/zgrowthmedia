import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

const logos = [
  {
    id: "logo-1",
    description: "Google",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: "logo-2",
    description: "Microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    id: "logo-3",
    description: "Shopify",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
  },
  {
    id: "logo-4",
    description: "Stripe",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    id: "logo-5",
    description: "Slack",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
  },
  {
    id: "logo-6",
    description: "Zoom",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Zoom_Logo_2022.svg",
  },
  {
    id: "logo-7",
    description: "HubSpot",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
  },
  // {
  //   id: "logo-8",
  //   description: "Atlassian",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atlassian-logo.svg",
  // },
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export { Logos3 };