import { useTranslation } from "react-i18next";

export function FooterSection() {
  const { t } = useTranslation();

  const navigationLinks = [
    { href: '#hero', labelKey: 'navigation.home' },
    { href: '#biography', labelKey: 'navigation.biography' },
    { href: '#interactive-modules', labelKey: 'navigation.interactiveModules' },
    { href: '#heritage', labelKey: 'navigation.heritage' },
  ];

  const accessibilityFeatures = [
    'WCAG 2.1 AA Compliant',
    'Keyboard Navigation',
    'Screen Reader Support',
    'High Contrast Mode',
  ];

  const technologies = [
    'React 18+',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
  ];

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-footer-title">
              {t('footer.title')}
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-footer-description">
              {t('footer.description')}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
              {t('footer.copyright')}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-card-foreground mb-4" data-testid="text-footer-navigation">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded text-left"
                    data-testid={`link-footer-${link.href.replace('#', '')}`}
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-card-foreground mb-4" data-testid="text-footer-accessibility">
              {t('footer.accessibility')}
            </h4>
            <ul className="space-y-2 text-muted-foreground mb-6">
              {accessibilityFeatures.map((feature, index) => (
                <li key={index} data-testid={`text-accessibility-${index}`}>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2" data-testid="text-technologies-label">
                {t('footer.technologies')}
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                    data-testid={`tech-${index}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
