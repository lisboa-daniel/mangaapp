'use server';

import { getUserFromSession } from "../actions/auth";

export default async function Dashboard() {
    const user = await getUserFromSession();
  
    if (!user) return <p>Please log in 😿</p>;
  
    return <p>Welcome back, {user.email} 💖</p>;
  }