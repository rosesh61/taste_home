import { Link } from "react-router-dom";
import "./AboutUs.css";

const VALUES = [
  {
    title: "광고 없는 큐레이션",
    desc: "저희는 어떠한 식당으로부터도 광고비나 협찬을 받지 않습니다. 오직 에디터의 주관적 경험과 판단만이 추천의 기준입니다.",
  },
  {
    title: "직접 방문, 직접 검증",
    desc: "모든 리뷰는 에디터가 실제로 방문하여 직접 식사한 후 작성됩니다. 사진도 현장에서 직접 촬영한 것만 사용합니다.",
  },
  {
    title: "실용적인 정보 제공",
    desc: "맛만이 아닌, 혼밥 가능 여부, 주차 가능 여부, 룸 유무, 콜키지 여부 등 실제 방문에 필요한 실용 정보를 함께 제공합니다.",
  },
  {
    title: "두 가지 상황을 위한",
    desc: "혼밥과 회식이라는 완전히 다른 두 상황에 최적화된 정보를 따로 제공합니다. 같은 식당도 상황에 따라 다르게 평가합니다.",
  },
];

const STATS = [
  { value: "200+", label: "직접 방문한 식당" },
  { value: "8", label: "서울 주요 권역" },
  { value: "0", label: "광고 및 협찬" },
  { value: "2021", label: "서비스 시작 연도" },
];

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-text">
            <p className="about-hero-eyebrow">About Seoul Table Guide</p>
            <h1 className="about-hero-title">
              서울의 진짜 맛집을<br />
              기록하는 사람들
            </h1>
            <p className="about-hero-desc">
              저희는 광고를 배제하고 서울 전역을 직접 돌아다니며,
              나 홀로 든든히 먹고 싶을 때와 다 같이 즐겁게 마시고 싶을 때
              찾아갈 수 있는 진짜 맛집만 기록합니다.
            </p>
          </div>
          <div className="about-hero-image">
            <img
              src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=700&q=80"
              alt="서울 맛집 탐방"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar container">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Mission */}
      <section className="about-section container">
        <div className="about-section-inner about-section-inner--text-center">
          <p className="about-section-eyebrow">Our Mission</p>
          <h2 className="about-section-title">
            서울에서 먹는 모든 한 끼가<br />
            의미 있는 경험이 되도록
          </h2>
          <p className="about-section-desc">
            혼자 밥을 먹을 때도 눈치를 보지 않아도 되는 공간이 있고,
            팀 전체가 함께 웃을 수 있는 회식 자리가 있습니다.
            서울 테이블 가이드는 그 두 가지 상황 모두를 위한 가이드가 되고자 합니다.
            맛있는 음식과 좋은 공간이 만나 만들어지는 기억을 돕는 것이 저희의 미션입니다.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <p className="about-section-eyebrow" style={{ textAlign: "center" }}>Our Values</p>
          <h2 className="about-section-title" style={{ textAlign: "center", marginBottom: 48 }}>
            서울 테이블 가이드가 지키는 원칙
          </h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} className="value-card">
                <span className="value-number">0{i + 1}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Review */}
      <section className="about-section container">
        <div className="review-process">
          <div className="review-process-text">
            <p className="about-section-eyebrow">How We Review</p>
            <h2 className="about-section-title">리뷰 작성 프로세스</h2>
            <div className="process-steps">
              <div className="process-step">
                <span className="process-step-num">1</span>
                <div>
                  <h4>후보 발굴</h4>
                  <p>에디터 추천, 현지인 제보, 직접 탐방을 통해 후보 식당을 선정합니다.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="process-step-num">2</span>
                <div>
                  <h4>익명 방문</h4>
                  <p>식당 측에 알리지 않고 일반 손님으로 방문하여 실제 서비스와 음식을 체험합니다.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="process-step-num">3</span>
                <div>
                  <h4>상황별 평가</h4>
                  <p>혼밥 적합도와 회식 적합도를 각각 별도의 기준으로 평가합니다.</p>
                </div>
              </div>
              <div className="process-step">
                <span className="process-step-num">4</span>
                <div>
                  <h4>재방문 검증</h4>
                  <p>게재 전 최소 2회 이상 방문하여 일관성을 확인한 후 공개합니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="review-process-image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="음식 리뷰 과정"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta container">
        <div className="about-cta-inner">
          <h2 className="about-cta-title">지금 바로 맛집을 찾아보세요</h2>
          <p className="about-cta-sub">
            오늘의 상황에 맞는 완벽한 식당이 기다리고 있습니다
          </p>
          <div className="about-cta-btns">
            <Link to="/category?situation=solo" className="btn-about btn-about--solo">
              혼밥 맛집 보기
            </Link>
            <Link to="/category?situation=group" className="btn-about btn-about--group">
              회식 장소 찾기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
