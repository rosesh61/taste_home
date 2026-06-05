import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import "./Home.css";

const soloList  = restaurants.filter((r) => r.situation.includes("solo"));
const groupList = restaurants.filter((r) => r.situation.includes("group"));

const QUICK_CATS = [
  { label: "한식",        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=70", to: "/category?type=한식" },
  { label: "일식",        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=70", to: "/category?type=일식" },
  { label: "양식",        image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=200&q=70", to: "/category?type=양식" },
  { label: "중식·아시안",  image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=70", to: "/category?type=중식·아시안" },
  { label: "카페·디저트",  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=70", to: "/category?type=카페·디저트" },
  { label: "술집·바",     image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=200&q=70", to: "/category?type=술집·바" },
];

const BENTO = [
  { size: "wide",   label: "혼밥 BEST",   title: "프로 혼밥러를\n위한 선택",  desc: "눈치 없이 편하게, 1인 최적화 공간",   to: "/category?situation=solo",  image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80",  badge: "SOLO",  badgeType: "solo" },
  { size: "tall",   label: "이번 주 신규", title: "오마카세\n료",             desc: "강남 · 일식 · ₩₩₩₩",               to: "/restaurant/1",             image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80", badge: "NEW",   badgeType: "new" },
  { size: "square", label: "에디터 추천",  title: "삼청동\n한옥 별채",        desc: "종로 · 한식 · ₩₩₩",               to: "/restaurant/2",             image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", badge: "BEST",  badgeType: "best" },
  { size: "square", label: "회식 BEST",   title: "성공적인\n회식 장소",       desc: "프라이빗 룸 · 콜키지 프리",           to: "/category?situation=group", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80", badge: "GROUP", badgeType: "group" },
];

const LOCATIONS = [
  { id: "강남/서초권", desc: "직장인 회식 중심",         img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=75" },
  { id: "종로/중구권", desc: "노포·룸식당 중심",          img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=75" },
  { id: "마포/홍대권", desc: "트렌디한 혼밥·캐주얼 모임", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=75" },
  { id: "성수/건대권", desc: "데이트·감성 맛집",          img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=75" },
  { id: "경기권",     desc: "수원·분당·판교·일산·하남",  img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=75" },
];

function StarRow({ score }) {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? "star-filled" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

function SliderCard({ r }) {
  const isSolo  = r.situation.includes("solo");
  const isGroup = r.situation.includes("group");
  return (
    <Link to={`/restaurant/${r.id}`} className="slider-card">
      <div className="slider-card-img-wrap">
        <img
          src={r.thumbnail}
          alt={r.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(r.name)}/400/300`;
          }}
        />
        <div className="slider-card-badges">
          {isSolo  && <span className="badge-solo">혼밥</span>}
          {isGroup && <span className="badge-group">회식</span>}
        </div>
        {r.featured && <span className="slider-card-best">BEST</span>}
      </div>
      <div className="slider-card-body">
        <p className="slider-card-meta">{r.category} · {r.location}</p>
        <h4 className="slider-card-name">{r.name}</h4>
        <div className="slider-card-score">
          {isSolo && (
            <>
              <StarRow score={r.soloScore} />
              <span className="score-label">혼밥</span>
            </>
          )}
        </div>
        <p className="slider-card-price">{r.priceRange}</p>
      </div>
    </Link>
  );
}

function HScroll({ title, label, seeAllTo, items, accentColor }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="hscroll-section">
      <div className="container">
        <div className="hscroll-header">
          <div className="hscroll-header-left">
            <span className="section-label">{label}</span>
            <h2 className="section-title" style={{ color: accentColor }}>{title}</h2>
          </div>
          <div className="hscroll-header-right">
            <button className="scroll-btn" onClick={() => scroll(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="scroll-btn" onClick={() => scroll(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <Link to={seeAllTo} className="see-all-btn">전체 보기 →</Link>
          </div>
        </div>
        <div className="hscroll-track" ref={ref}>
          {items.map((r) => <SliderCard key={r.id} r={r} />)}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-slide hero-slide--main" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85)" }}>
          <div className="hero-overlay" />
          <div className="hero-content container">
            <span className="hero-eyebrow">서울 맛집 큐레이션 #1</span>
            <h1 className="hero-title">
              완벽한 혼밥부터<br />
              <em>성공적인 회식</em>까지
            </h1>
            <p className="hero-desc">광고 없이, 발로 뛰어 검증한 서울의 진짜 맛집</p>
            <div className="hero-btns">
              <Link to="/category?situation=solo" className="hero-btn hero-btn--primary">혼밥 맛집 보기</Link>
              <Link to="/category?situation=group" className="hero-btn hero-btn--ghost">회식 장소 찾기</Link>
            </div>
          </div>
          <div className="hero-stat-strip">
            <div className="hero-stat"><strong>200+</strong><span>직접 방문 검증</span></div>
            <div className="hero-stat-div" />
            <div className="hero-stat"><strong>4</strong><span>서울 주요 권역</span></div>
            <div className="hero-stat-div" />
            <div className="hero-stat"><strong>0</strong><span>광고·협찬</span></div>
          </div>
        </div>
      </section>

      {/* Quick Category */}
      <section className="quick-cat">
        <div className="quick-cat-inner container">
          {QUICK_CATS.map((c) => (
            <Link key={c.label} to={c.to} className="quick-cat-item">
              <div className="quick-cat-img">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(c.label)}/200/200`;
                  }}
                />
              </div>
              <span className="quick-cat-label">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <section className="bento">
        <div className="container">
          <div className="bento-grid">
            {BENTO.map((b) => (
              <Link
                key={b.title}
                to={b.to}
                className={`bento-card bento-card--${b.size}`}
                style={{ backgroundImage: `url(${b.image})` }}
              >
                <div className="bento-overlay" />
                <div className="bento-content">
                  <div className="bento-top">
                    <span className={`bento-badge bento-badge--${b.badgeType}`}>{b.badge}</span>
                    <span className="bento-label">{b.label}</span>
                  </div>
                  <div className="bento-bottom">
                    <h3 className="bento-title">{b.title}</h3>
                    <p className="bento-desc">{b.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 혼밥 베스트 슬라이더 */}
      <HScroll
        title="혼밥 베스트"
        label="Solo Dining"
        seeAllTo="/category?situation=solo"
        items={soloList}
        accentColor="var(--color-solo)"
      />

      {/* 프로모 배너 */}
      <section className="promo-banner">
        <div className="container">
          <div
            className="promo-inner"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=80)" }}
          >
            <div className="promo-overlay" />
            <div className="promo-content">
              <span className="promo-eyebrow">에디터의 한마디</span>
              <h2 className="promo-title">
                "팀장님도 직원도 모두 만족하는<br />
                회식 장소가 있습니다"
              </h2>
              <Link to="/category?situation=group" className="promo-cta">
                회식 맛집 전체 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 회식 베스트 슬라이더 */}
      <HScroll
        title="회식 베스트"
        label="Group & Company"
        seeAllTo="/category?situation=group"
        items={groupList}
        accentColor="var(--color-group)"
      />

      {/* 지역 탐색 */}
      <section className="location-section">
        <div className="container">
          <span className="section-label">Location</span>
          <h2 className="section-title">지역별로 탐색하기</h2>
          <p className="section-subtitle">서울의 맛집 밀집 지역을 선택해 보세요</p>
          <div className="location-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} to={`/category?location=${loc.id}`} className="loc-card">
                <div className="loc-card-img">
                  <img
                    src={loc.img}
                    alt={loc.id}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(loc.id)}/500/320`;
                    }}
                  />
                </div>
                <div className="loc-card-body">
                  <h4 className="loc-card-name">{loc.id}</h4>
                  <p className="loc-card-desc">{loc.desc}</p>
                  <span className="loc-card-arrow">탐색하기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About 배너 */}
      <section className="about-teaser">
        <div className="container">
          <div className="about-teaser-inner">
            <div className="about-teaser-img">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80"
                alt="About"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://picsum.photos/seed/about/700/500";
                }}
              />
            </div>
            <div className="about-teaser-text">
              <span className="section-label">About Us</span>
              <h2 className="about-teaser-title">광고 없이, 직접 먹고<br />솔직하게 씁니다</h2>
              <p className="about-teaser-desc">
                저희는 서울 전역을 직접 돌아다니며 나 홀로 든든히 먹고 싶을 때와
                다 같이 즐겁게 마시고 싶을 때 찾아갈 수 있는 진짜 맛집만 기록합니다.
                모든 리뷰는 에디터가 직접 방문 후 작성하며, 어떠한 광고도 없습니다.
              </p>
              <Link to="/about" className="about-teaser-btn">더 알아보기 →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
