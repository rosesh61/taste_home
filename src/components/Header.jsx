import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const NAV = [
  {
    label: "상황별 맛집",
    children: [
      { label: "프로 혼밥러를 위한", to: "/category?situation=solo", badge: "SOLO" },
      { label: "성공적인 회식/모임", to: "/category?situation=group", badge: "GROUP" },
    ],
  },
  {
    label: "종류별 맛집",
    children: [
      { label: "든든한 한식", to: "/category?type=한식" },
      { label: "깔끔한 일식", to: "/category?type=일식" },
      { label: "분위기 있는 양식", to: "/category?type=양식" },
      { label: "이색적인 중식·아시안", to: "/category?type=중식·아시안" },
      { label: "카페·디저트", to: "/category?type=카페·디저트" },
      { label: "술집·바(Bar)", to: "/category?type=술집·바" },
    ],
  },
  {
    label: "지역별",
    children: [
      { label: "강남/서초권", to: "/category?location=강남/서초권" },
      { label: "종로/중구권", to: "/category?location=종로/중구권" },
      { label: "마포/홍대권", to: "/category?location=마포/홍대권" },
      { label: "성수/건대권", to: "/category?location=성수/건대권" },
      { label: "경기권",     to: "/category?location=경기권" },
    ],
  },
  { label: "About", to: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const go = (to) => { navigate(to); setMenuOpen(false); setHover(null); };

  return (
    <header className="header">
      {/* Announcement bar */}
      <div className="announce-bar">
        <p>서울 전역 직접 방문 검증 · 광고·협찬 Zero · 매주 새로운 맛집 업데이트</p>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="header-inner container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-mark">STG</span>
            <span className="logo-text">
              <span className="logo-kr">서울 테이블 가이드</span>
              <span className="logo-en">SEOUL TABLE GUIDE</span>
            </span>
          </Link>

          {/* Search */}
          <div className={`search-wrap ${searchOpen ? "search-wrap--open" : ""}`}>
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
              <input
                className="search-input"
                type="text"
                placeholder="식당 이름, 지역, 음식 종류로 검색"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="header-actions">
            <Link to="/category?situation=solo" className="action-btn action-btn--solo">
              혼밥
            </Link>
            <Link to="/category?situation=group" className="action-btn action-btn--group">
              회식
            </Link>
            <button
              className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* GNB */}
        <nav className="gnb">
          <ul className="gnb-list container">
            {NAV.map((item) =>
              item.to ? (
                <li key={item.label} className="gnb-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `gnb-link ${isActive ? "gnb-link--active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ) : (
                <li
                  key={item.label}
                  className="gnb-item gnb-item--has-sub"
                  onMouseEnter={() => setHover(item.label)}
                  onMouseLeave={() => setHover(null)}
                >
                  <button className="gnb-link">
                    {item.label}
                    <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                      <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  {hover === item.label && (
                    <div className="gnb-dropdown">
                      {item.children.map((c) => (
                        <button key={c.label} className="gnb-dropdown-item" onClick={() => go(c.to)}>
                          {c.badge && <span className={`gnb-badge gnb-badge--${c.badge.toLowerCase()}`}>{c.badge}</span>}
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input type="text" placeholder="식당·지역·음식 검색" />
          </div>
          <div className="mobile-nav">
            {NAV.map((item) =>
              item.to ? (
                <button key={item.label} className="mobile-nav-item" onClick={() => go(item.to)}>
                  {item.label}
                </button>
              ) : (
                <div key={item.label} className="mobile-nav-group">
                  <p className="mobile-nav-group-title">{item.label}</p>
                  {item.children.map((c) => (
                    <button key={c.label} className="mobile-nav-child" onClick={() => go(c.to)}>
                      {c.label}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
