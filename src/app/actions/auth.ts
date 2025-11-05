'use server';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { SignupFormSchema, FormState } from '@/app/lib/validation'
import * as argon2 from "argon2";
import { redirect } from 'next/navigation';



export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await argon2.hash(password);
  let user : any | undefined = undefined;

  
  user = await NewUser({ name: name, email: email, password: hashedPassword, role: 1 });
  

  if (!user) return { message: 'Failed to create user.' };
  else {
        // Create a JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '7d' }
        );

        // Set cookie
        (await
          // Set cookie
          cookies()).set('session', token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        redirect('/signin/redirect');
      }

}

export async function signin(state: FormState, formData: FormData) {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;


  const hashedPassword = await argon2.hash(password);
  let user : any | undefined = undefined;

  user = await Login(email);
  

  if (!user) return { message: 'Failed to login.' };
  else {
  
    if (!(await argon2.verify(user.password, password))){

      console.error(`invalid credentials\n${user.password}\n${hashedPassword}`);
      
    } else {
      // Create a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      // Set cookie
      (await
        // Set cookie
        cookies()).set('session', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });



   

      redirect('/signin/redirect');
     
    }
     
  }

}

async function Login(email : string) {
  const API_URI = process.env.API_URL + 'user';

  const response = await fetch(`${API_URI}/login/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });



  if (!response.ok) {
    console.error('Failed to find user:', response.statusText);
    return null;
  } 

  // Parse the JSON response to get the login user
  const loginUser = await response.json();
  return loginUser;
}



async function NewUser(body: User) {
  const API_URI = process.env.API_URL + 'user';

  const response = await fetch(`${API_URI}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error('Failed to create user:', response.statusText);
    return null;
  }

  // Parse the JSON response to get the created user
  const createdUser = await response.json();
  return createdUser;
}

export async function getUserFromSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('session')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as DecodedSessionPayload; // contains { id, email }
  } catch (err) {
    return null;
  }
}

export async function logout(){
  const cookieStore = cookies();
  const token = (await cookieStore).get('session')?.value;
  if (token) (await cookieStore).delete('session');



  redirect('/logout');
  
}

