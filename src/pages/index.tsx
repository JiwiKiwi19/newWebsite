import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/loginPage"); // Redirect to the login page
  }, [router]);

  return null; // Render nothing while redirecting
}
