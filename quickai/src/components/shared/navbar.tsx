import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "../../../hooks/authContext/useContext";
import { ThemeToggle } from "../ui/theme.toggle";
import Login from "../login";
import Profile from "../profile"; // ← create this component

export default function NavBar() {
  const { isLogin } = useAuth();

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
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                Service
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 flex flex-col gap-2 min-w-50">
                <NavigationMenuLink href="/image_restore">Image Restore</NavigationMenuLink>
                <NavigationMenuLink href="/object_remove">Object Remove</NavigationMenuLink>
                <NavigationMenuLink href="/generative_fills">Generative Fill</NavigationMenuLink>
                <NavigationMenuLink href="/object_recolor">Object ReColor</NavigationMenuLink>
                <NavigationMenuLink href="/backgorund_remover">Background Remover</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <a href="/contact">ContactUs</a>
      </div>

      {/* Right Section */}
      <div className="items-center gap-3 flex">
        <ThemeToggle />
        {isLogin ? <Profile /> : <Login />}  {/* ← toggle here */}
      </div>

    </nav>
  );
}