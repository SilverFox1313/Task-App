import "@styles/global.css";
import Nav from "@/components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "The Homeworks",
};

const Rootlayout = ({ children }) => (
  <html lang="en">
    <body>
    <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default Rootlayout;
