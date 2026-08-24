import { PortfolioHome } from "@/components/PortfolioHome";
import { getPortfolioPageData } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPortfolioPageData();
  return <PortfolioHome {...data} />;
}
