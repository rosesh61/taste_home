import { Link } from "react-router-dom";
import "./RestaurantCard.css";

function StarRating({ score }) {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function RestaurantCard({ restaurant, variant = "default" }) {
  const { id, name, category, location, priceRange, soloScore, groupScore,
    situation, thumbnail, tags, soloDifficulty } = restaurant;

  const isSolo = situation.includes("solo");
  const isGroup = situation.includes("group");

  return (
    <Link to={`/restaurant/${id}`} className={`card card--${variant}`}>
      <div className="card-image-wrap">
        <img
          src={thumbnail}
          alt={name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`;
          }}
        />
        <div className="card-badges">
          {isSolo && <span className="badge-solo">혼밥 가능</span>}
          {isGroup && <span className="badge-group">모임 적합</span>}
        </div>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">{category}</span>
          <span className="card-dot">·</span>
          <span className="card-location">{location}</span>
          <span className="card-dot">·</span>
          <span className="card-price">{priceRange}</span>
        </div>

        <h3 className="card-name">{name}</h3>

        <div className="card-scores">
          {isSolo && (
            <div className="card-score-row">
              <span className="card-score-label">혼밥 지수</span>
              <StarRating score={soloScore} />
              {soloDifficulty && (
                <span className={`difficulty difficulty--${soloDifficulty}`}>
                  난이도 {soloDifficulty}
                </span>
              )}
            </div>
          )}
          {isGroup && (
            <div className="card-score-row">
              <span className="card-score-label">회식 적합도</span>
              <StarRating score={groupScore} />
            </div>
          )}
        </div>

        <div className="card-tags">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
