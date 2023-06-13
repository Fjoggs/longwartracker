import "./globals.scss";

export const metadata = {
  title: "Long War Tracker",
  description:
    "Website to track your current mission progress this month for a long war campaign",
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
