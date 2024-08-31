import Nav from "@/components/Nav";
import "@/styles/global.css";
import Provider from "@/components/Provider";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "PromptGen",
  description: "Discover and share AI prompts from around the web",
  icons: {
    icon: "/assets/icons/promptIC.png",
  },
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app h-full">
            <Toaster position="top-center" />
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
