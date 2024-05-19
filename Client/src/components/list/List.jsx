import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ListItem from "../listItem/ListItem";
import "./List.scss";

export default function List({ list }) {
  return (
    <div className={`list ${!list.content ? "has-search" : ""}`}>
      <span className="listTitle">{list.title ?? "Danh sách tìm kiếm"}</span>
      <div className="wrapper">
        {list.content && (
          <Swiper
            slidesPerView={1}
            modules={[Navigation]}
            navigation={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1190: {
                width: 1190,
                slidesPerView: 4,
              },
            }}
          >
            {list.content.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <ListItem index={i} item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* render list search */}
        {!list.content &&
          list.length > 0 &&
          list.map((item, i) => {
            return <ListItem index={i} item={item._id} />;
          })}
      </div>

      {!list.content && list.length === 0 && (
        <span>Không có kết quả tìm kiếm phù hợp với tìm kiếm của bạn!.</span>
      )}
    </div>
  );
}
