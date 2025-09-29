import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Donate Doggo",
  description: "Donate to our furry companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/doggo.png" />
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Navbar />
          <main className="p-8 lg:p-5 max-w-3xl mx-auto">{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
