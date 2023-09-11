import React,{useState} from 'react'
import Carousal from '../../../components/carousal/Carousal';
import ContentWrapper from '../../../components/contentwraper/Contentwraper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/UseFetch';


const Popular = () => {
const [endPoint, setEndpoint] = useState("movie")
const {data,loading} = useFetch(`/${endPoint}/popular`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousal 
      data={data?.results} 
      loading={loading}
      endpoint={endPoint}/>
    </div>
  );
};

export default Popular;