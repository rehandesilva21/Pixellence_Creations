import type { Metadata } from "next";
// TypeScript may complain about side-effect CSS imports in some setups; ignore here
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixellence Creations",
  description:
    "Premium content creation agency — world-class graphics, cinematic video production, and intuitive UI design.",
     keywords: [
    "Graphic Design Sri Lanka",
    "Video Editing Sri Lanka",
    "Creative Agency",
    "Branding Agency",
    "UI UX Design",
  ],

  openGraph: {
    title: "Pixellence Creations",
    description:
      "Premium content creation and branding agency.",
    url: "https://pixellence-creations.vercel.app",
    siteName: "Pixellence Creations",
    locale: "en_US",
    type: "website",
  },
     icons: {
    icon: "/Images/Pixellence-new.jpg",
  },
   verification: {
    google: "80ICjaYuja5GGv3iGKeTYw254EucMxnOHJg8BVjyxHQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
