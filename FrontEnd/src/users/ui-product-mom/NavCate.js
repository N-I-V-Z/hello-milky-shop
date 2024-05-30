import React, { useState } from 'react';
import './NavCate.css'; // Assume styles are defined in NavCate.css or you can use inline styles

const NavCate = () => {
    const [showMenu, setShowMenu] = useState(false);
    /*
    Khuyến mại lớn
     Sữa cho mẹ
     Sữa cho bé   
    Voucher
    Tin tức
    */
    return (
        <div className="nav_cate width-common">
            <ul>
                <li
                    className="cate_home nav_top"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <i className="fa fa-bars"></i>Danh mục
                    {showMenu && (
                        <div className="box_list_cate">
                            <div className="menu_cate">
                                <div>
                                    <ul>
                                        <li className="cate_li menu-30">
                                            <a href="/danh-muc/khuyen-mai-lon" className="cate_li_title">
                                                <img
                                                    className="img_icon icon_color"
                                                    src="https://shoptretho.com.vn/Content/images/khuyen-mai.png?mode=max&width=60&height=60"
                                                    alt="Khuyến mại lớn"
                                                />
                                                <img
                                                    className="img_icon icon_hover"
                                                    src="https://shoptretho.com.vn/Content/images/khuyen-mai.png?mode=max&width=60&height=60"
                                                    alt="Khuyến mại lớn"
                                                />
                                                Khuyến mại lớn
                                            </a>
                                        </li>
                                        <li className="cate_li menu-30">
                                            <a href="/danh-muc/cho-be-an" className="cate_li_title">
                                                <img
                                                    className="img_icon icon_color"
                                                    src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                                                    alt="Sữa cho mẹ"
                                                />
                                                <img
                                                    className="img_icon icon_hover"
                                                    src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                                                    alt="Sữa cho mẹ"
                                                />
                                                Sữa cho mẹ
                                            </a>
                                        </li>
                                        <li className="cate_li menu-66569036">
                                            <a href="/danh-muc/cho-be-mac" className="cate_li_title">
                                                <img
                                                    className="img_icon icon_color"
                                                    src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                                                    alt=" Sữa cho bé"
                                                />
                                                <img
                                                    className="img_icon icon_hover"
                                                    src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                                                    alt=" Sữa cho bé"
                                                />
                                                Sữa cho bé
                                            </a>
                                        </li>
                                        <li className="cate_li menu-57412712">
                                            <a href="/danh-muc/voucher" className="cate_li_title">
                                                <img
                                                    className="img_icon icon_color"
                                                    src="https://cdn-icons-png.flaticon.com/512/869/869649.png"
                                                    alt="Voucher"
                                                />
                                                <img
                                                    className="img_icon icon_hover"
                                                    src="https://cdn-icons-png.flaticon.com/512/869/869649.png"
                                                    alt="Voucher"
                                                />
                                                Voucher
                                            </a>
                                        </li>
                                        <li className="cate_li menu-2011021743240">
                                            <a href="/danh-muc/tin-tuc" className="cate_li_title">
                                                <img
                                                    className="img_icon icon_color"
                                                    src="https://raw.githubusercontent.com/hocdethanhdev/Hello-Milky-Shop/main/FrontEnd/public/news.png?token=GHSAT0AAAAAACSSV3OT5ZRWNUSLY3IVED5SZSW24UQ"
                                                    alt="Tin tức"
                                                />
                                                <img
                                                    className="img_icon icon_hover"
                                                    src="https://raw.githubusercontent.com/hocdethanhdev/Hello-Milky-Shop/main/FrontEnd/public/news.png?token=GHSAT0AAAAAACSSV3OT5ZRWNUSLY3IVED5SZSW24UQ"
                                                    alt="Tin tức"
                                                />
                                                Tin tức
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
                <li className="nav_top">
                    <a href="/">Trang chủ <i className="fa fa-angle-right"></i></a>
                </li>
                <li className="nav_top">
                    <a href="/danh-muc/do-dung-cho-me">Đồ dùng cho mẹ <i className="fa fa-angle-right"></i></a>
                </li>
                <li className="nav_top">
                    <a href="/danh-muc/sua-dinh-duong">Sữa &amp; dinh dưỡng <i className="fa fa-angle-right"></i></a>
                </li>
                <li className="nav_top">
                    <a href="/danh-muc/sua-cho-nguoi-lon">Sữa cho người lớn <i className="fa fa-angle-right"></i></a>
                </li>
                <li className="nav_top main_cate">
                    <a href="/sua-ensure-uc-vi-vanilla-850g">Sữa Ensure Úc vị Vanilla 850g</a>
                </li>
            </ul>
        </div>
    );
};

export default NavCate;