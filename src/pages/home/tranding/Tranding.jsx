import React,{useState} from 'react'
import Carousal from '../../../components/carousal/Carousal';
import ContentWrapper from '../../../components/contentwraper/Contentwraper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/UseFetch';


const Tranding = () => {
const [endPoint, setEndpoint] = useState("day")
const {data,loading} = useFetch(`/trending/all/${endPoint}`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Tranding</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading}/>
    </div>
  );
};

export default Tranding;