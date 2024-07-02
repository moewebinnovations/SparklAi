import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const homeNav = [
    { name: 'Home', href: '/' },
  ];
  return (
    <div>
      <Header navigation={homeNav}/>
    <div className="flex items-center justify-center h-screen">
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
    </div>
  );
}
