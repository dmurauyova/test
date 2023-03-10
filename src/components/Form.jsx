import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const encode = (data) => {
      return Object.keys(data)
         .map(
            (key) =>
               encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
         )
         .join("&");
   };

   const onSubmit = (data, e) => {
      console.log(e.target.getAttribute("name"));
      fetch("/", {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: encode({
            "form-name": e.target.getAttribute("name"),
            ...data,
         }),
      })
         .then((response) => console.log(response))
         .catch((error) => alert(error));
   };

   return (
      <div className='App'>
         <form
            name='contact'
            onSubmit={handleSubmit(onSubmit)}
            data-netlify='true'
            data-netlify-honeypot='bot-field'
         >
            <input
               type='hidden'
               name='form-name'
               value='contact'
               method='post'
            />
            <div className='form-control'>
               <label>Email</label>
               <input
                  type='text'
                  name='email'
                  {...register("email", {
                     required: true,
                     pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
               />
               {errors.email && errors.email.type === "required" && (
                  <p className='errorMsg'>Email is required.</p>
               )}
               {errors.email && errors.email.type === "pattern" && (
                  <p className='errorMsg'>Email is not valid.</p>
               )}
            </div>
            <div className='form-control'>
               <label>Password</label>
               <input
                  type='password'
                  name='password'
                  {...register("password", {
                     required: true,
                     minLength: 6,
                  })}
               />
               {errors.password && errors.password.type === "required" && (
                  <p className='errorMsg'>Password is required.</p>
               )}
               {errors.password && errors.password.type === "minLength" && (
                  <p className='errorMsg'>
                     Password should be at-least 6 characters.
                  </p>
               )}
            </div>
            <div className='form-control'>
               <label></label>
               <button type='submit'>Login</button>
            </div>
         </form>
      </div>
   );
}
