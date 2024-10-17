import About from "../../components/about";
import Benefit from "../../components/benefit";
import Category from "../../components/category";
import ContactUs from "../../components/contact";
import Service from "../../components/service";
import Hero from "../../components/hero";

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <About />
      <Benefit />
      <ContactUs />
      <Service />
    </>
  );
}

export default Home;
