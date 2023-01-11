export const protectedRoutes = [
    {role: 'user', routes: ["/items", "/stocks"]},
];
export const authRoutes = ["/register", "/login"];
export const publicRoutes = ["/"];