import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ThemeToggle } from "../ui/theme.toggle";

export default function NavBar() {
  return (
    <nav className="bg-primary-light/40 w-full h-16 px-4 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            src="/better.png"
            alt="logo"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>

        <div className="text-primary-dark font-semibold text-lg">
          Quick AI
        </div>
      </div>

      {/* Nav Links */}
      <div className="items-center md:gap-10 gap-4 flex">

        <a href="/">Home</a>

        <a href="/about_us">About Us</a>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>

              <NavigationMenuTrigger
                className="
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                "
              >
                Service
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-4 flex flex-col gap-2 min-w-50">

                <NavigationMenuLink href="/image_restore">
                  Image Restore
                </NavigationMenuLink>

                <NavigationMenuLink  href="/object_remove">
                  Object Remove
                </NavigationMenuLink>

                <NavigationMenuLink  href="/generative_fills">
                  Generative Fill
                </NavigationMenuLink>

                <NavigationMenuLink  href="/object_recolor">
                  Object ReColor
                </NavigationMenuLink>

                <NavigationMenuLink  href="/backgorund_remover">
                  Background Remover
                </NavigationMenuLink>

              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <a href="/contact">ContactUs</a>
      </div>

      {/* Right Section */}
      <div className="items-center gap-3 flex">

        <ThemeToggle />

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
                    name="name"
                    required
                    placeholder="Enter your email"
                  />
                </Field>

                <Field>
                  <Label htmlFor="username-1">
                    Username
                  </Label>

                  <Input
                    id="username-1"
                    name="username"
                    placeholder="@username"
                  />
                </Field>
                <Field>
                  <Label htmlFor="name-1">
                    Password
                  </Label>

                  <Input
                    id="name-1"
                    name="name"
                    required
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
                  <Button type="submit">
                    Save Changes
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

      </div>
    </nav>
  );
}