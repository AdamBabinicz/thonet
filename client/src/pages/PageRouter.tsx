import { useTranslation } from "react-i18next";
import { useParams } from "wouter";
import Privacy from "./privacy";
import Terms from "./terms";
import NotFound from "./not-found";

export default function PageRouter() {
  const { page } = useParams<{ page?: string }>();
  const { t } = useTranslation();

  if (!page) {
    return <NotFound />;
  }

  if (page === t("routes.privacy")) {
    return <Privacy />;
  }

  if (page === t("routes.terms")) {
    return <Terms />;
  }

  return <NotFound />;
}
