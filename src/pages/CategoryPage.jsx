import { useSearchParams } from "react-router-dom";
import { restaurants, categories } from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import "./CategoryPage.css";

const SITUATION_META = {
  solo: {
    title: "프로 혼밥러를 위한",
    subtitle: "Solo Dining — 1인 바 테이블, 조용한 분위기, 혼밥 난이도까지",
    color: "solo",
  },
  group: {
    title: "성공적인 회식/모임",
    subtitle: "Group & Company — 프라이빗 룸, 단체석, 콜키지, 주차 정보까지",
    color: "group",
  },
};

export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSituation = searchParams.get("situation") || "";
  const activeType = searchParams.get("type") || "";
  const activeLocation = searchParams.get("location") || "";

  const filtered = restaurants.filter((r) => {
    if (activeSituation && !r.situation.includes(activeSituation)) return false;
    if (activeType && r.category !== activeType) return false;
    if (activeLocation && r.location !== activeLocation) return false;
    return true;
  });

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const clearAll = () => setSearchParams({});

  const meta = activeSituation ? SITUATION_META[activeSituation] : null;

  const pageTitle = meta
    ? meta.title
    : activeType
    ? `${activeType} 맛집`
    : activeLocation
    ? `${activeLocation} 맛집`
    : "전체 맛집";

  const hasFilter = activeSituation || activeType || activeLocation;

  return (
    <div className="category-page">
      {/* Page Header */}
      <div className={`category-header ${meta ? `category-header--${meta.color}` : ""}`}>
        <div className="container">
          <h1 className="category-page-title">{pageTitle}</h1>
          {meta && <p className="category-page-sub">{meta.subtitle}</p>}
          {!meta && (
            <p className="category-page-sub">
              총 {filtered.length}개의 맛집을 찾았습니다
            </p>
          )}
        </div>
      </div>

      <div className="container">
        {/* Filter Bar */}
        <div className="filter-bar">
          {/* Situation */}
          <div className="filter-group">
            <p className="filter-group-label">상황</p>
            <div className="filter-chips">
              {categories.situation.map((s) => (
                <button
                  key={s.id}
                  className={`filter-chip filter-chip--${s.id} ${activeSituation === s.id ? "filter-chip--active" : ""}`}
                  onClick={() => setFilter("situation", s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Food Type */}
          <div className="filter-group">
            <p className="filter-group-label">종류</p>
            <div className="filter-chips">
              {categories.foodType.map((f) => (
                <button
                  key={f.id}
                  className={`filter-chip ${activeType === f.id ? "filter-chip--active-neutral" : ""}`}
                  onClick={() => setFilter("type", f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="filter-group">
            <p className="filter-group-label">지역</p>
            <div className="filter-chips">
              {categories.location.map((l) => (
                <button
                  key={l.id}
                  className={`filter-chip ${activeLocation === l.id ? "filter-chip--active-neutral" : ""}`}
                  onClick={() => setFilter("location", l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilter && (
            <button className="clear-filter" onClick={clearAll}>
              필터 초기화
            </button>
          )}
        </div>

        {/* Results */}
        <div className="results-header">
          <p className="results-count">
            <strong>{filtered.length}개</strong>의 맛집
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">조건에 맞는 맛집이 없습니다</p>
            <p className="empty-sub">필터를 조정해 보세요</p>
            <button className="clear-filter" onClick={clearAll}>
              전체 보기
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
