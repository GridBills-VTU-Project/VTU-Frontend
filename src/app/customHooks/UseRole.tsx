import { useAuthUser } from "./UseQueries";

export default function UseRole( roles:string[] ):boolean {
  const { data: user } = useAuthUser();

  if (!user) return false;
  // user.role = 'Admin'
  if (!roles.includes(user.role)) return false;

  return true;
}