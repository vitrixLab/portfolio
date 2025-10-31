import React, { useEffect } from "react";
import "./Nav.css";

const Nav = ({ scrollToSection }) => {
  useEffect(() => {
  const burger = document.querySelector(".header__burger");
  const navWrapper = document.querySelector(".header__navigation-wrapper");
  const headerEl = document.querySelector(".header");

  // --- scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- attach scroll to nav links
  const navLinks = document.querySelectorAll(".header__list-item > a[data-target]");
  const handleNavClick = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target");
    if (targetId) {
      e.preventDefault();
      scrollToSection(targetId);
      // close mobile nav if open
      if (navWrapper.classList.contains("open")) {
        burger.classList.remove("active");
        navWrapper.classList.remove("open");
      }
    }
  };
  navLinks.forEach((link) => link.addEventListener("click", handleNavClick));

  // --- burger toggle
  const handleBurgerClick = () => {
    burger.classList.toggle("active");
    navWrapper.classList.toggle("open");
  };
  if (burger && navWrapper) burger.addEventListener("click", handleBurgerClick);

  // --- submenu toggle (mobile)
  const submenuItems = document.querySelectorAll(".header__list-item.has-submenu");
  const handleSubmenuClick = (item) => () => {
    if (window.innerWidth > 1025) return;
    item.classList.toggle("active");
    const submenuWrapper = item.querySelector(".submenu-wrapper");
    submenuWrapper.style.maxHeight = submenuWrapper.style.maxHeight
      ? null
      : `${submenuWrapper.scrollHeight}px`;
  };
  submenuItems.forEach((item) => item.addEventListener("click", handleSubmenuClick(item)));

  // --- resize handler
  const handleResize = () => {
    if (window.innerWidth <= 1025) {
      document.querySelectorAll(".header__list-item.has-submenu.active").forEach((item) => {
        const submenuWrapper = item.querySelector(".submenu-wrapper");
        if (submenuWrapper) submenuWrapper.style.maxHeight = `${submenuWrapper.scrollHeight}px`;
      });
    } else {
      document.querySelectorAll(".submenu-wrapper").forEach((wrapper) => (wrapper.style.maxHeight = null));
    }
  };
  window.addEventListener("resize", handleResize);

  // --- prevent empty links
  const emptyLinks = document.querySelectorAll('a[href="#"]');
  const preventDefault = (e) => e.preventDefault();
  emptyLinks.forEach((link) => link.addEventListener("click", preventDefault));

  // --- submenu hover (desktop)
  const submenuWrappers = document.querySelectorAll(".submenu-wrapper");
  submenuWrappers.forEach((submenuWrapper) => {
    const submenuItems = submenuWrapper.querySelectorAll(".submenu-list__item.has-submenu");
    const defaultActiveItem = submenuWrapper.querySelector(".submenu-list__item.has-submenu.active");
    let returnTimeout;

    submenuItems.forEach((item) =>
      item.addEventListener("mouseenter", () => {
        clearTimeout(returnTimeout);
        submenuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      })
    );

    submenuWrapper.addEventListener("mouseleave", () => {
      submenuItems.forEach((i) => i.classList.remove("active"));
      returnTimeout = setTimeout(() => {
        if (defaultActiveItem) defaultActiveItem.classList.add("active");
      }, 300);
    });
  });

  // --- header scroll animation
  const THRESHOLD = 50;
  const onScroll = () => {
    if (!headerEl) return;
    headerEl.classList.toggle("scrolled", window.scrollY > THRESHOLD);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- cleanup
  return () => {
    if (burger && navWrapper) burger.removeEventListener("click", handleBurgerClick);
    submenuItems.forEach((item) => item.removeEventListener("click", handleSubmenuClick(item)));
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", onScroll);
    emptyLinks.forEach((link) => link.removeEventListener("click", preventDefault));
    navLinks.forEach((link) => link.removeEventListener("click", handleNavClick));
  };
}, []);


  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="#" className="header__logo">
          <img loading="lazy" src="https://i.postimg.cc/DZDyvYw8/soojidano-nav-logo-white.png" alt="Logo" />
        </a>

        <div className="header__navigation-wrapper">
          <nav className="header__navigation">
            <ul className="header__list">
              {/* About */}
              <li className="header__list-item has-submenu">
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                >
                  <span>About</span>
                </a>
              </li>

              {/* Projects */}
              <li className="header__list-item has-submenu">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  <span>Projects</span>
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.612712 0.200408C0.916245 -0.081444 1.39079 -0.0638681 1.67265 0.239665L4.37305 3.14779L7.07345 0.239665C7.35531 -0.0638681 7.82986 -0.081444 8.13339 0.200408C8.43692 0.48226 8.4545 0.956809 8.17265 1.26034L4.92265 4.76034C4.78074 4.91317 4.5816 5 4.37305 5C4.1645 5 3.96536 4.91317 3.82345 4.76034L0.573455 1.26034C0.291603 0.956809 0.309179 0.48226 0.612712 0.200408Z"
                      fill="white"
                    />
                  </svg>
                </a>

                {/* Submenu */}
                <div className="submenu-wrapper">
                  <div className="submenu-list__wrapper">
                    <div className="submenu-list__title">List of Projects</div>
                    <ul className="submenu-list">
                      {/* Project 1 */} 
                        <li className="submenu-list__item has-submenu active">
                        <div className="submenu-list__item-wrapper">
                            <div className="submenu-list__item-icon flex items-center justify-center">
                            {/* SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                            >
                                <rect
                                width="44"
                                height="44"
                                rx="10"
                                fill="#2BBE22"
                                fillOpacity="0.1"
                                />
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 25.2969C25.866 25.2969 29 22.1629 29 18.2969C29 14.4309 25.866 11.2969 22 11.2969C18.134 11.2969 15 14.4309 15 18.2969C15 22.1629 18.134 25.2969 22 25.2969Z"
                                fill="#2BBE22"
                                />
                            </svg>
                            </div>

                            <a href="#" className="submenu-list__item-link">
                            <span className="submenu-list__item-title">ERP Cloud Migration</span>
                            <span className="submenu-list__item-subtile">
                                → SAP S/4HANA migration for Fortune 500, cutting costs 40% and boosting performance 3×.
                            </span>
                            </a>

                            <div className="submenu-content" style={{visibility: 'visible'}}>
                                <div className="submenu-content__title">Project Highlights</div>
                                <ul className="submenu-content__list">
                                    <li className="submenu-content__list-item">
                                    <a href="#" className="https://github.com/vitrixLab/SAP-Project-Phase-1-abap-platform-rap120">
                                        <div className="submenu-content__link-img">
                                        <img
                                            loading="lazy"
                                            src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p1-1.png"
                                            alt="ERP Cloud Migration - Cost Savings"
                                        />
                                        </div>
                                        <div className="submenu-content__link-title">Cost Optimization Achieved</div>
                                        <div className="submenu-content__link-text">
                                        Achieved 40% reduction in operational costs through SAP S/4HANA cloud migration for a Fortune 500 client.
                                        </div>
                                    </a>
                                    </li>
                                    <li className="submenu-content__list-item">
                                    <a href="#" className="https://github.com/vitrixLab/SAP-Project-Phase-2-abap-platform-rap110">
                                        <div className="submenu-content__link-img">
                                        <img
                                            loading="lazy"
                                            src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p1-2.png"
                                            alt="ERP Cloud Migration - System Boost"
                                        />
                                        </div>
                                        <div className="submenu-content__link-title">System Performance Boost</div>
                                        <div className="submenu-content__link-text">
                                        Increased system processing speed by 3×, enhancing efficiency across critical business operations.
                                        </div>
                                    </a>
                                    </li>
                                    <li className="submenu-content__list-item">
                                    <a href="#" className="https://github.com/vitrixLab/SAP-Project-Phase-3-fiori-elements-feature-showcase">
                                        <div className="submenu-content__link-img">
                                        <img
                                            loading="lazy"
                                            src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p1-3.png"
                                            alt="ERP Cloud Migration - Cloud Transform"
                                        />
                                        </div>
                                        <div className="submenu-content__link-title">Cloud Transformation Success</div>
                                        <div className="submenu-content__link-text">
                                        Seamless SAP S/4HANA migration to the cloud, modernizing legacy infrastructure while minimizing downtime.
                                        </div>
                                    </a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </li>

                        {/* Project 2 */}
                        <li className="submenu-list__item has-submenu active">
                        <div className="submenu-list__item-wrapper">
                            <div className="submenu-list__item-icon">
                            {/* SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                            >
                                <rect
                                width="44"
                                height="44"
                                rx="10"
                                fill="#2BBE22"
                                fillOpacity="0.1"
                                />
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 25.2969C25.866 25.2969 29 22.1629 29 18.2969C29 14.4309 25.866 11.2969 22 11.2969C18.134 11.2969 15 14.4309 15 18.2969C15 22.1629 18.134 25.2969 22 25.2969Z"
                                fill="#2BBE22"
                                />
                            </svg>
                            </div>
                            <a href="#" className="submenu-list__item-link">
                            <span className="submenu-list__item-title">AI Microservices Platform</span>
                            <span className="submenu-list__item-subtile">
                                → Scalable SaaS leveraging local LLMs, handling 500K+ daily requests under 200ms.
                            </span>
                            </a>
                        </div>

                        <div className="submenu-content">
                            <div className="submenu-content__title">Project Highlights</div>
                            <ul className="submenu-content__list">
                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p2-1.png"
                                    alt="Ultra-Low Latency APIs"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Ultra-Low Latency APIs</div>
                                <div className="submenu-content__link-text">
                                    AI microservices respond in under 200ms, ensuring real-time user experience across platforms.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p2-2.jpg"
                                    alt="Seamless LLM Integration"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Seamless LLM Integration</div>
                                <div className="submenu-content__link-text">
                                    Local large language models are embedded directly into our platform for faster, private AI computations.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/soojidano%20p2-3.jpg"
                                    alt="Scalable Cloud Architecture"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Scalable Cloud Architecture</div>
                                <div className="submenu-content__link-text">
                                    Our microservices architecture scales horizontally, supporting hundreds of thousands of concurrent users seamlessly.
                                </div>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>


                        {/* Project 3 */}
                        <li className="submenu-list__item has-submenu active">
                        <div className="submenu-list__item-wrapper">
                            <div className="submenu-list__item-icon">
                            {/* SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                            >
                                <rect
                                width="44"
                                height="44"
                                rx="10"
                                fill="#2BBE22"
                                fillOpacity="0.1"
                                />
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 25.2969C25.866 25.2969 29 22.1629 29 18.2969C29 14.4309 25.866 11.2969 22 11.2969C18.134 11.2969 15 14.4309 15 18.2969C15 22.1629 18.134 25.2969 22 25.2969Z"
                                fill="#2BBE22"
                                />
                            </svg>
                            </div>
                            <a href="#" className="submenu-list__item-link">
                            <span className="submenu-list__item-title">Multi-Cloud DevOps</span>
                            <span className="submenu-list__item-subtile">
                                → Hybrid AWS/Azure/GCP CI/CD pipeline with 95% deployment success rate.
                            </span>
                            </a>
                        </div>

                        <div className="submenu-content">
                            <div className="submenu-content__title">Project Highlights</div>
                            <ul className="submenu-content__list">
                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p3-1.png"
                                    alt="CI/CD Pipeline"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Automated Deployments</div>
                                <div className="submenu-content__link-text">
                                    CI/CD pipelines automatically deploy code across AWS, Azure, and GCP, reducing manual errors and downtime.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p3-2.png"
                                    alt="Hybrid Cloud"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Hybrid Cloud Orchestration</div>
                                <div className="submenu-content__link-text">
                                    Unified monitoring and orchestration across multiple cloud providers ensures consistency and scalability.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p3-3.png"
                                    alt="Monitoring & Metrics"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Real-Time Metrics</div>
                                <div className="submenu-content__link-text">
                                    Deployment dashboards and automated alerts provide actionable insights to maintain a 95% success rate.
                                </div>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>


                      {/* Project 4 */}
                        <li className="submenu-list__item has-submenu active">
                        <div className="submenu-list__item-wrapper">
                            <div className="submenu-list__item-icon">
                            {/* SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                            >
                                <rect
                                width="44"
                                height="44"
                                rx="10"
                                fill="#2BBE22"
                                fillOpacity="0.1"
                                />
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 25.2969C25.866 25.2969 29 22.1629 29 18.2969C29 14.4309 25.866 11.2969 22 11.2969C18.134 11.2969 15 14.4309 15 18.2969C15 22.1629 18.134 25.2969 22 25.2969Z"
                                fill="#2BBE22"
                                />
                            </svg>
                            </div>
                            <a href="#" className="submenu-list__item-link">
                            <span className="submenu-list__item-title">BI Integration Suite</span>
                            <span className="submenu-list__item-subtile">
                                → Unified BI platform connecting ERP, CRM, and legacy systems for real-time analytics.
                            </span>
                            </a>
                        </div>

                        <div className="submenu-content">
                            <div className="submenu-content__title">Project Highlights</div>
                            <ul className="submenu-content__list">
                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p4-1.png"
                                    alt="Real-Time Dashboards"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Real-Time Dashboards</div>
                                <div className="submenu-content__link-text">
                                    Connect multiple data sources to visualize KPIs instantly, helping stakeholders make fast, informed decisions.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p4-2.png"
                                    alt="Advanced Analytics"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Advanced Analytics</div>
                                <div className="submenu-content__link-text">
                                    Built-in AI/ML models provide predictive insights and trend analysis across ERP, CRM, and legacy systems.
                                </div>
                                </a>
                            </li>

                            <li className="submenu-content__list-item">
                                <a href="#" className="submenu-content__link">
                                <div className="submenu-content__link-img">
                                    <img
                                    loading="lazy"
                                    src="https://raw.githubusercontent.com/vitrixLab/portfolio/refs/heads/main/frontend/src/images/projects/soojidano%20p4-3.png"
                                    alt="Custom Reports"
                                    />
                                </div>
                                <div className="submenu-content__link-title">Custom Reports</div>
                                <div className="submenu-content__link-text">
                                    Generate automated reports across business units with full customization, improving operational efficiency.
                                </div>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>

                    </ul>
                  </div>
                </div>
              </li>

              {/* Skills */}
              <li className="header__list-item has-submenu">
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("skills");
                  }}
                >
                  <span>Skills</span>
                </a>
              </li>

              {/* Contact */}
              <li className="header__list-item has-submenu">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </nav>

          <div class="header__buttons-wrapper">
                <a href="#" class="header__button">
                <span>Get a Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                        <path d="M0.5 6.99996H15.5M15.5 6.99996L9.66667 1.16663M15.5 6.99996L9.66667 12.8333" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                </a>
                <a href="#" class="header__button">
                    <span>Consult Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                        <path d="M0.5 6.99996H15.5M15.5 6.99996L9.66667 1.16663M15.5 6.99996L9.66667 12.8333" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                </a>

          </div>

        </div>

        {/* Burger */}
        <div className="header__burger">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </header>
  );
};

export default Nav;
