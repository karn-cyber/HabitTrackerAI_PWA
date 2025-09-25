import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Habit Tracker AI",
  description: "AI-powered habit tracker with smart insights and streak management",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <head>
          <meta name="theme-color" content="#0f0f23" />
        </head>
        <body className="bg-gray-900 text-white min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
