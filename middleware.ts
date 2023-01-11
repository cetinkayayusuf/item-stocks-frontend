import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {authRoutes, protectedRoutes} from "./src/router/routes";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;
    const userSessionExpired = (currentUser && Date.now() > JSON.parse(currentUser).expiredAt);
    let protectedRoute = false;
    let hasAuthority = false;
    for (let roleIndex = 0; !protectedRoute && roleIndex < protectedRoutes.length; roleIndex++) {
        for (let routeIndex = 0; !protectedRoute && routeIndex < protectedRoutes[roleIndex].routes.length; routeIndex++) {
            if (protectedRoutes[roleIndex].routes[routeIndex] === request.nextUrl.pathname) {
                protectedRoute = true;
                if (currentUser) {
                    const userRoles = JSON.parse(currentUser).roles;
                    for (let i = 0; i < userRoles.length; i++) {
                        if (userRoles[i].toLowerCase() === protectedRoutes[roleIndex].role)
                            hasAuthority = true;
                    }
                }
            }
        }
    }
    if (protectedRoute && (!currentUser || userSessionExpired)) {
        console.log({currentUser: !currentUser, userSessionExpired, hasAuthority})
        request.cookies.delete("currentUser");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("currentUser");

        return response;
    }

    if(protectedRoute && !hasAuthority)
    {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}