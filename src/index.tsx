// filepath: /Users/jiwonlee/Projects/AGI/newWebsite/src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return null;
}
