import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname === "/login";
  const isProtectedRoute = pathname.startsWith("/dashboard");
  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/account/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (res.status === 200) {
        if (isLoginPage) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
      }

      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  } else if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
