import { useRouter } from "next/router";
import { Charm_700 } from "@/components/Layout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/form/Input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FloatingInput from "@/components/ui/form/FloatingInput";
import FormGroup from "@/components/ui/form/FormGroup";

const SignupPage = () => {
  const router = useRouter();

  const themeState = useSelector((state) => state.theme);
  const [inputTheme, setInputTheme] = useState("");

  const { theme } = themeState;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (theme === "dark") setInputTheme("black");
    if (theme === "light") setInputTheme("white");
  }, [theme]);

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed flex items-center justify-center bg-light dark:bg-black select-none"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card
        className={
          "lg:w-1/3 bg-white dark:bg-dark rounded border dark:border-dark py-12 px-8"
        }
      >
        <Card.Header className={"mb-8"}>
          <h1
            className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl mx-auto ${Charm_700.className}`}
          >
            <Link href={"/"}>instamern</Link>
          </h1>
        </Card.Header>
        <Card.Body className={"my-8"}>
          <FormGroup>
            <FloatingInput
              type={"text"}
              name={"fullname"}
              placeholder={"Fullname"}
              variant={inputTheme}
            />
          </FormGroup>
          <FormGroup>
            <FloatingInput
              type={"text"}
              name={"username"}
              placeholder={"Username"}
              variant={inputTheme}
            />
          </FormGroup>
          <FormGroup>
            <FloatingInput
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              variant={inputTheme}
            />
          </FormGroup>
          <FloatingInput
            type={"password"}
            name={"password-confirm"}
            placeholder={"Password Confirm"}
            variant={inputTheme}
          />
        </Card.Body>
        <Card.Footer>
          <Button type={"button"} variant={"primary"} className={"w-full py-4"}>
            Sign up
          </Button>
          <section className="flex items-center justify-center"></section>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default SignupPage;
