import Header from "@/components/Header";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const homeNav = [
    { name: 'Home', href: '/' },
  ];
  return (
    <div>
            <Header navigation={homeNav}/>
    <div className="flex items-center justify-center h-screen">
      <SignUp fallbackRedirectUrl="/dashboard" />
    </div>
    </div>

  );
}
