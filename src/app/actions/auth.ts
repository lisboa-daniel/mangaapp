'use server';

import { SignupFormSchema, FormState } from '@/app/lib/validation'
import * as argon2 from "argon2";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await argon2.hash(password);

    // 3. Insert the user into the database or call an Auth Library's API
    await NewUser({name: name, email: email, password: hashedPassword})


    // if (!user) {
    //     return {
    //         message: 'An error occurred while creating your account.',
    //     }
    // }
 
  // Call the provider or db to create a user...

}



async function NewUser(body : User){

    const API_URI =  process.env.API_URL + 'User/';

    const request = await fetch(`${API_URI}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
    });

   console.log(request.statusText);

} 