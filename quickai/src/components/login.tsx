"use client";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { FieldGroup, Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
interface ILoginDetails {
  username?: string,
  email: string,
  password?: string
}

export default function Login() {
  const [userLoginDetails, setUserLoginDetails] = useState<ILoginDetails>({
    username: "",
    email: "",
    password: "",
  });

  function setValues(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setUserLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    console.log(userLoginDetails);
    try {
      const reply = await fetch("api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginDetails),
        },
      );
      const data = await reply.json();

      if (!reply.ok) {
        console.error("Login failed:", data.message);
        return;
      }
    }
    catch (e) {
      console.log("error in login ", e)
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              Login
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm flex flex-col gap-4">

            <DialogHeader>
              <DialogTitle className="items-center font-extrabold text-2xl">
                Login
              </DialogTitle>

              <DialogDescription className="">
                Enter your details to continue.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>

              <Field>
                <Label htmlFor="name-1">
                  Email
                </Label>

                <Input
                  id="name-1"
                  name="email"
                  required
                  value={userLoginDetails.email}
                  onChange={setValues}
                  placeholder="Enter your email"
                />
              </Field>

              <Field>
                <Label htmlFor="username-1">
                  Username
                </Label>

                <Input
                  id="username-1"
                  value={userLoginDetails.username}
                  name="username"
                  onChange={setValues}
                  placeholder="@username"
                />
              </Field>
              <Field>
                <Label htmlFor="name-1">
                  Password
                </Label>

                <Input
                  id="name-1"
                  name="password"
                  required
                  value={userLoginDetails.password}

                  onChange={setValues}
                  placeholder="Min 8 chars with @ # $ % ? !"
                />
              </Field>

            </FieldGroup>

            <DialogFooter className="justify-center! gap-3 bg-white">

              <DialogClose asChild>
                <Button variant='destructive'>
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button onClick={handleSubmit} type="submit">
                  Login
                </Button>
              </DialogClose>

            </DialogFooter>

            <p className="text-center text-sm">
              Not signed up yet?{" "}
              <span className="text-primary-dark font-medium cursor-pointer">
                <a href="/sign-up">Sign Up</a>
              </span>
            </p>

          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}