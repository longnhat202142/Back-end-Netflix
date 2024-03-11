// import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ListItem from "../listItem/ListItem";
import "./List.scss";

export default function List({ list }) {
  //const listRef = useRef(null);

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <Swiper slidesPerView={3} modules={[Navigation]} navigation={true}>
          {list.content.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <ListItem index={i} item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
