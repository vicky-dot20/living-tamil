import OfflineManager from "@/components/OfflineManager";
import { getDiscoveries } from "@/lib/content";
export default function OfflinePage(){return <OfflineManager discoveries={getDiscoveries()}/>}
