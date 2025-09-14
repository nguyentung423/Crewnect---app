import Hero from "../components/Hero/Hero";
import UpcomingEvents from "../components/UpcomingEvents/UpcomingEvents";
import HotShifts from "../components/HotShifts/HotShifts";
import Roles from "../components/Roles/Roles";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Clients from "../components/Clients/Clients";
import SuccessStories from "../components/SuccessStories/SuccessStories";
import Cta from "../components/Cta/Cta";

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <HotShifts />
      <Roles />
      <HowItWorks />
      <Clients />
      <SuccessStories />
      <Cta />
    </>
  );
};

export default Home;
