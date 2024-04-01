import { AppProvider } from "@/components/provider"
import { Resources } from "@/components/resources"

export default function Home() {
  return (
    <AppProvider>
      <Resources />
    </AppProvider>
  )
}
