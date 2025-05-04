import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/utils/supabase/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "@/utils/supabase/actions";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 sm:top-4 z-50 flex justify-center">
      <nav className="h-12 w-full sm:w-[85%] sm:rounded-3xl px-6 flex justify-between items-center bg-primary">
        <Link href="/" className="text-lg font-semibold">
          Imagify
        </Link>
        <div className="flex gap-4">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt="@imagify"
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.full_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{user?.user_metadata?.full_name}</span>
                  <span>{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form>
                    <button formAction={signOut} className="w-full">
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                "rounded-full border border-foreground text-foreground hover:text-primary-foreground hover:border-primary-foreground transition-colors"
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
