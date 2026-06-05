import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-mark">STG</div>
            <p className="footer-logo-kr">서울 테이블 가이드</p>
            <p className="footer-logo-en">SEOUL TABLE GUIDE</p>
            <p className="footer-desc">
              완벽한 혼밥부터 성공적인 회식까지,<br />
              광고 없이 직접 검증한 서울 맛집 큐레이션
            </p>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-title">상황별</p>
            <ul>
              <li><Link to="/category?situation=solo">프로 혼밥러를 위한</Link></li>
              <li><Link to="/category?situation=group">성공적인 회식/모임</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-title">종류별</p>
            <ul>
              <li><Link to="/category?type=한식">든든한 한식</Link></li>
              <li><Link to="/category?type=일식">깔끔한 일식</Link></li>
              <li><Link to="/category?type=양식">분위기 있는 양식</Link></li>
              <li><Link to="/category?type=중식·아시안">이색적인 중식·아시안</Link></li>
              <li><Link to="/category?type=카페·디저트">카페·디저트</Link></li>
              <li><Link to="/category?type=술집·바">술집·바(Bar)</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-title">지역별</p>
            <ul>
              <li><Link to="/category?location=강남/서초권">강남/서초권</Link></li>
              <li><Link to="/category?location=종로/중구권">종로/중구권</Link></li>
              <li><Link to="/category?location=마포/홍대권">마포/홍대권</Link></li>
              <li><Link to="/category?location=성수/건대권">성수/건대권</Link></li>
              <li><Link to="/category?location=경기권">경기권</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2024 서울 테이블 가이드. 모든 리뷰는 직접 방문 후 작성됩니다.</p>
          <Link to="/about" className="footer-about-link">About Us</Link>
        </div>
      </div>
    </footer>
  );
}
