import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();

  const initialvalues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];
    
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    if (values.email === "chandru@gmail.com" && values.password === "asdfghjk") {
      localStorage.setItem("adminAuth", "true");
      navigate("/dashboard");
    } else {
      setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
    }
    setSubmitting(false);
  };

  return (
    <div className='min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4'>
      <div className='bg-[#e0e5ec] rounded-2xl w-full max-w-2xl p-8 md:p-12
        shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_#ffffff]'>
        <div className='flex flex-col items-center justify-center mb-8'>
          <div className='p-6 rounded-full mb-6
            shadow-[8px_8px_16px_#bec3c9,-8px_-8px_16px_#ffffff]'>
            <MdAdminPanelSettings className='text-indigo-600 size-20' />
          </div>
          <h1 className='text-gray-800 text-3xl md:text-4xl font-semibold'>
            Admin Authentication
          </h1>
        </div>
        <Formik
          initialValues={initialvalues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-md mx-auto space-y-6">
              {fields.map(({ label, ...fieldProps }, index) => (
                <div key={index} className="transform transition-all duration-200 hover:scale-[1.02]">
                  <InputComponent 
                    label={label} 
                    {...fieldProps}
                  />
                </div>
              ))}
              <div className="transform transition-all duration-200 hover:scale-[1.02] pt-4">
                <ButtonComponent
                  type="submit"
                  name={isSubmitting ? "Authenticating..." : "Login to Dashboard"}
                  isSubmitting={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Authentication;