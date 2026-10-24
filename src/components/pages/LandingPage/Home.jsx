import Aboutus from "./Aboutus";
import Services from "./Services"
import Locations from "./Locations"

const Home = () => {    
    return(
        <>
        <section className="relative bg-cover bg-right bg-neutral-primary dark:bg-[url('/Ginecologo.jpg')] md:pt-150 pb-20 overflow-hidden border-b border-default">
    
        </section>
        
        <div>
          <Aboutus />
        </div>

        <div>
          <Services />
        </div>
        
        <div>
          <Locations />
        </div>
        </>
    )
}

export default Home;

