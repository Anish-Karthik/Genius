import Heading from "@/components/Heading"
import { SettingsIcon } from "lucide-react"
import { checkSubscription } from "@/lib/subscription"
import { SubscriptionButton } from "@/components/SubscriptionButton"

const SettingsPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings and subscriptions."
        Icon={SettingsIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are subscribed to the Pro plan." : "You are not subscribed to the Pro plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage