// import AuthNavigationBar from "../components/auth-navbar";
// import "../styles/globals.css";

// export default function BaseLayout({
//   children, // will be a page or nested layout
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" data-theme="dark" className="bg-background-default">
//       <AuthNavigationBar />
//       <body className="mt-48">
//         {children}
//         </body>
//     </html>
//   );
// }


import AuthNavigationBar from "../../components/auth-navbar";
import NavigationBar from "../../components/navbar";
import "../styles/globals.css";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="bg-background-default">
      <body>
        <AuthNavigationBar />
        <section className="mt-24">{children}</section>
      </body>
    </html>
  );
}
