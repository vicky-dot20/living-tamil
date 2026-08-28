import HomeExperience from "@/components/HomeExperience";
import { getDiscoveries, getJourneys } from "@/lib/content";

export default function Home() {
  return <HomeExperience discoveries={getDiscoveries()} journeys={getJourneys()} />;
}
