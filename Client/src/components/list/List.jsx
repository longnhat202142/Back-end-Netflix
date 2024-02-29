import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import "./List.scss";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function List({ list }) {
  const listRef = useRef(null);

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <Swiper slidesPerView={3}>
          {list.content.map((item, i) => {
            return (
              <SwiperSlide>
                <ListItem key={i} index={i} item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
