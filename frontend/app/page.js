import CategoryBox from "./components/modules/CategoryBox/CategoryBox";
import NewsContainer from "./components/modules/NewsContainer/NewsContainer";
import SliderBaner from "./components/modules/SliderBaner/SliderBaner";
import Title from "./components/modules/Title/Title";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { SiWorldhealthorganization } from "react-icons/si"
import { BsPcDisplay } from "react-icons/bs";
import { PiChartLineUpBold } from "react-icons/pi";

export default function Home() {
  return (
    <div>
      <main>
        <SliderBaner />
        <div className="container">
          <Title
            title={"Please select the news category you are interested in:"}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <CategoryBox text={"sport"} icon={<MdOutlineSportsMartialArts/>}/>
            <CategoryBox text={"politics"} icon={<GiWorld/>}/>
            <CategoryBox text={"health"} icon={<SiWorldhealthorganization/>}/>
            <CategoryBox text={"technology"} icon={<BsPcDisplay/>}/>
            <CategoryBox text={"economics"} icon={<PiChartLineUpBold/>}/>
          </div>

          <Title title={"Hot News"} />
          <NewsContainer />
        </div>
      </main>
    </div>
  );
}
