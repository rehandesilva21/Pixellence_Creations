import type { Metadata } from "next";
// TypeScript may complain about side-effect CSS imports in some setups; ignore here
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixellence Creations",
  description:
    "Premium content creation agency — world-class graphics, cinematic video production, and intuitive UI design.",
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
