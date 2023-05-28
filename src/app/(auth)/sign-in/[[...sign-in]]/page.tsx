import PageContent from "@/components/pageContent";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <PageContent>
        <SignIn />
    </PageContent>
  )
}