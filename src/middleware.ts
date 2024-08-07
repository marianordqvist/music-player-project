export { auth as middleware } from "../authconfig";

// will not be affected by middleware:
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
