import { Logos3 } from "../../../components/logos3";

const demoData = {
    heading: "Trusted by these companies",
    logos: [
        {
            id: "logo-1",
            description: "Google",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            className: "h-7 w-auto",
        },
        {
            id: "logo-2",
            description: "Microsoft",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
            className: "h-7 w-auto",
        },
        {
            id: "logo-3",
            description: "Shopify",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
            className: "h-7 w-auto",
        },
        {
            id: "logo-4",
            description: "Slack",
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
            className: "h-7 w-auto",
        },
        {
            id: "logo-5",
            description: "Stripe",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
            className: "h-6 w-auto",
        },
        {
            id: "logo-6",
            description: "Notion",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
            className: "h-7 w-auto",
        },
        {
            id: "logo-7",
            description: "Zoom",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Zoom_Logo_2022.svg",
            className: "h-6 w-auto",
        },
        {
            id: "logo-8",
            description: "HubSpot",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
            className: "h-7 w-auto",
        },
    ],
};

function Logos3Demo() {
    return <Logos3 {...demoData} />;
}

export { Logos3Demo };