import PageContent from "@/components/pageContent";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <PageContent>
        <SignUp />
    </PageContent>
  )
}