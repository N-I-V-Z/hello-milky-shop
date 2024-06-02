import React from "react";
import Slider from "react-slick";
import { TiThMenu } from "react-icons/ti";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product1.css";
import Menu from "./Menu";

function Product1() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="list_category" className="width-common-product">
      <div className="wrap">
        <div className="row">
          <div className="col-md-3 tri">
            <Menu />
          </div>
          <div className="col-md-9 tri">
            <div className="main_slide">
              <Slider {...sliderSettings}>
                <div className="box_slider">
                  <img src="/banner1.png" alt="Banner 1" />
                </div>
                <div className="box_slider">
                  <img src="/banner2.jpg" alt="Banner 2" />
                </div>
                <div className="box_slider">
                  <img src="/banner3.png" alt="Banner 3" />
                </div>
              </Slider>
              <div className="box_product_suggest">
                <div className="clear" />
              </div>
              <div className="clear" />
            </div>
          </div>
        </div>
      </div>
      {/* Product 2 */}
      <section
        id="list_product_cate"
        className="width-common boxx-common tm-d superSale"
        data-recoedwidget="true"
      >
        <div className="wrap">
          <div className="category width-common" id="relative-btnMore">
            <div className="box-container-header">
              <div className="box-title box-title-Sgg">Giá Sốc Hôm Nay</div>
              <div className="box-time box-time-allDay"></div>
            </div>
            <div className="box-container-bottom">
              <div className="item item-giasoc">
                <div className="image_item">
                  <a
                    href="/sua-kid-essentials-nestle-800g-1-10-tuoi"
                    target="_blank"
                  >
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg?mode=max&width=400&height=400"
                      alt="Sữa Kid Essentials Nestle 800g (1-10 tuổi)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a
                      href="/sua-kid-essentials-nestle-800g-1-10-tuoi"
                      target="_blank"
                    >
                      Sữa Kid Essentials Nestle 800g (1-10 tuổi)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">580.000đ</span>
                  <span className="old_price">625.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a
                    href="/sua-aptamil-new-zealand-so-2-900g-12-24-thang"
                    target="_blank"
                  >
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20230529/sua-aptamil-newzealand-2.jpg?mode=max&width=400&height=400"
                      alt="Sữa Aptamil New Zealand số 2 900g (12-24 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a
                      href="/sua-aptamil-new-zealand-so-2-900g-12-24-thang"
                      target="_blank"
                    >
                      Sữa Aptamil New Zealand số 2 900g (12-24 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">659.000đ</span>
                  <span className="old_price">664.000đ</span>
                  <span className="discount discount-Sgg">-5k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT 3 */}


      <section id="combo_1f" className="combo-1f-section">
        <div className="combo-1f-wrap ">
          <div className="combo-1f-content">
            <div className="combo-1f-header">
              <div className="combo-1f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-1f-title">
                <h2>Combo dành cho mẹ</h2>
              </div>
            </div>
            <div className="combo-1f-main">
              <img
                src=".//ImageMilkShop/banner-tang.png"
                alt="Combo siêu tiết kiệm"
              />
            </div>
            <div className="combo-content">
              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>

              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>

              {/* Add more combo items as needed */}
            </div>
          </div>
        </div>
      </section>

      {/* COMBO DÀNH CHO BÉ */}
      <section id="combo_2f" className="combo-2f-section">
        <div className="combo-2f-wrap ">
          <div className="combo-2f-content">
            <div className="combo-2f-header">
              <div className="combo-2f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-2f-title">
                <h2>Combo dành cho bé</h2>
              </div>
            </div>
            <div className="combo-2f-main">
              <img
                src=".//ImageMilkShop/banner-tang.png"
                alt="Combo siêu tiết kiệm"
              />
            </div>
            <div className="combo-content-1">
              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>

              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>
              <div className="combo-item-1">
                <img src=".//ImageMilkShop/aptakid.jpg" alt="Combo 2" />
                <div className="combo-details-1">
                  <h3>Combo đi sinh tiêu chuẩn</h3>
                  <p>2.266.000đ</p>
                </div>
              </div>

              {/* Add more combo items as needed */}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Product1;
