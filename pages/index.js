import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-end">
      <Button
        type={"button"}
        variant={"primary"}
        className={"rounded-xl"}
        onClick={() => router.push("/auth/signup")}
      >
        Sign up
      </Button>
    </header>
  );
}
