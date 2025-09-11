import { useTranslation } from "react-i18next";
import { useLocation, Link } from "wouter";

export function FooterSection() {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const currentLanguage = i18n.language;

  const navigationLinks = [
    { id: "hero", labelKey: "navigation.home" },
    { id: "biography", labelKey: "navigation.biography" },
    { id: "interactive-modules", labelKey: "navigation.interactiveModules" },
    { id: "heritage", labelKey: "navigation.heritage" },
  ];

  const scrollToSection = (sectionId: string) => {
    const pathWithoutHash = location.split("#")[0];
    const isHomePage =
      pathWithoutHash === "/" || /^\/(pl|en|de)$/.test(pathWithoutHash);

    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const lang = i18n.language;
      setLocation(`/${lang}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  const createLocalizedPath = (routeKey: string) => {
    const slug = i18n.getResource(
      currentLanguage,
      "translation",
      `routes.${routeKey}`
    );
    return `/${currentLanguage}/${slug || routeKey}`;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    setLocation(path);
  };

  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear > startYear ? `${startYear} - ${currentYear}` : startYear;

  const privacyPath = createLocalizedPath("privacy");
  const termsPath = createLocalizedPath("terms");

  return (
    <footer
      className="bg-card border-t border-border py-12"
      data-testid="footer"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-lg font-semibold text-card-foreground mb-4 font-serif"
              data-testid="text-footer-title"
            >
              {t("footer.title")}
            </h3>
            <p
              className="text-muted-foreground mb-4"
              data-testid="text-footer-description"
            >
              {t("footer.description")}
            </p>
            <p
              className="text-xs text-muted-foreground mt-4"
              data-testid="text-footer-disclaimer"
            >
              {t("footer.disclaimer")}
            </p>
          </div>

          <div>
            <h4
              className="text-md font-medium text-card-foreground mb-4"
              data-testid="text-footer-navigation"
            >
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded text-left"
                    data-testid={`link-footer-${link.id}`}
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-serif">
              {t("footer.legal.title")}
            </h4>
            <div className="space-y-2">
              {/* <Link
                href={privacyPath}
                onClick={(e) => handleLinkClick(e, privacyPath)}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
              <Link
                href={termsPath}
                onClick={(e) => handleLinkClick(e, termsPath)}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t("footer.legal.terms")}
              </Link> */}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              {t("footer.legal.details", { year: yearDisplay })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
