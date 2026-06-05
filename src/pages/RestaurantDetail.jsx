import { useParams, Link, useNavigate } from "react-router-dom";
import { getRestaurantById, restaurants } from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import "./RestaurantDetail.css";

function StarRating({ score, size = "md" }) {
  return (
    <span className={`star-rating star-rating--${size}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? "star-filled" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    return (
      <div className="detail-error container">
        <h2>식당 정보를 찾을 수 없습니다.</h2>
        <button onClick={() => navigate(-1)} className="back-btn">← 돌아가기</button>
      </div>
    );
  }

  const {
    name, category, location, address, hours, parking, phone,
    priceRange, soloScore, groupScore, situation, gallery,
    description, recommendMenu, editorNote, tags,
    privateRoom, corkageFree, soloDifficulty,
  } = restaurant;

  const isSolo = situation.includes("solo");
  const isGroup = situation.includes("group");

  const related = restaurants
    .filter((r) => r.id !== restaurant.id && (r.category === category || r.location === location))
    .slice(0, 3);

  return (
    <div className="detail">
      {/* Breadcrumb */}
      <div className="breadcrumb container">
        <Link to="/">홈</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/category?type=${category}`}>{category}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{name}</span>
      </div>

      {/* Gallery */}
      <div className="gallery container">
        <div className="gallery-main">
          <img src={gallery[0]} alt={`${name} 메인`} />
        </div>
        {gallery.length > 1 && (
          <div className="gallery-side">
            {gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="gallery-side-item">
                <img src={img} alt={`${name} ${i + 2}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="detail-content container">
        <div className="detail-main">
          {/* Header */}
          <div className="detail-header">
            <div className="detail-badges">
              {isSolo && <span className="badge-solo">혼밥 가능</span>}
              {isGroup && <span className="badge-group">모임 적합</span>}
              <span className="tag">{category}</span>
              <span className="tag">{location}</span>
            </div>
            <h1 className="detail-name">{name}</h1>
            <p className="detail-price">{priceRange}</p>
          </div>

          {/* Score Summary */}
          <div className="score-summary">
            {isSolo && (
              <div className="score-item score-item--solo">
                <p className="score-item-label">혼밥 지수</p>
                <StarRating score={soloScore} size="lg" />
                <p className="score-item-value">{soloScore}/5</p>
                {soloDifficulty && (
                  <span className={`difficulty difficulty--${soloDifficulty}`}>
                    혼밥 난이도 {soloDifficulty}
                  </span>
                )}
              </div>
            )}
            {isGroup && (
              <div className="score-item score-item--group">
                <p className="score-item-label">회식 적합도</p>
                <StarRating score={groupScore} size="lg" />
                <p className="score-item-value">{groupScore}/5</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="detail-section">
            <h2 className="detail-section-title">식당 소개</h2>
            <p className="detail-description">{description}</p>
          </div>

          {/* Editor Note */}
          <div className="editor-note">
            <p className="editor-note-label">에디터 한마디</p>
            <blockquote className="editor-note-text">"{editorNote}"</blockquote>
          </div>

          {/* Recommend Menu */}
          <div className="detail-section">
            <h2 className="detail-section-title">추천 메뉴</h2>
            <ul className="menu-list">
              {recommendMenu.map((m) => (
                <li key={m} className="menu-item">
                  <span className="menu-dot" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="detail-section">
            <h2 className="detail-section-title">태그</h2>
            <div className="tag-list">
              {tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="detail-sidebar">
          <div className="info-card">
            <h3 className="info-card-title">기본 정보</h3>

            <div className="info-row">
              <span className="info-icon">📍</span>
              <div>
                <p className="info-label">주소</p>
                <p className="info-value">{address}</p>
              </div>
            </div>

            <div className="info-row">
              <span className="info-icon">🕐</span>
              <div>
                <p className="info-label">영업시간</p>
                <p className="info-value">{hours}</p>
              </div>
            </div>

            <div className="info-row">
              <span className="info-icon">📞</span>
              <div>
                <p className="info-label">전화번호</p>
                <p className="info-value">{phone}</p>
              </div>
            </div>

            <div className="info-divider" />

            <div className="info-features">
              <div className={`info-feature ${parking ? "info-feature--yes" : "info-feature--no"}`}>
                <span>{parking ? "✓" : "✗"}</span> 주차 {parking ? "가능" : "불가"}
              </div>
              {privateRoom !== undefined && (
                <div className={`info-feature ${privateRoom ? "info-feature--yes" : "info-feature--no"}`}>
                  <span>{privateRoom ? "✓" : "✗"}</span> 프라이빗 룸 {privateRoom ? "있음" : "없음"}
                </div>
              )}
              {corkageFree !== undefined && (
                <div className={`info-feature ${corkageFree ? "info-feature--yes" : "info-feature--no"}`}>
                  <span>{corkageFree ? "✓" : "✗"}</span> 콜키지 {corkageFree ? "프리" : "유료"}
                </div>
              )}
            </div>
          </div>

          <div className="map-placeholder">
            <p className="map-placeholder-text">지도 보기</p>
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent(name)}`}
              target="_blank"
              rel="noreferrer"
              className="map-link"
            >
              네이버 지도에서 열기 →
            </a>
          </div>
        </aside>
      </div>

      {/* Related Restaurants */}
      {related.length > 0 && (
        <section className="related container">
          <h2 className="section-title">비슷한 맛집</h2>
          <p className="section-subtitle">같은 지역이나 같은 카테고리의 맛집을 더 둘러보세요</p>
          <div className="related-grid">
            {related.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
