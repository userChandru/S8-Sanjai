import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { MdAdminPanelSettings } from "react-icons/md";
const Authentication = () => {

      const initialvalues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
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
    
  return (
      <div className=' flex items-center justify-center  '>
          <div className=' bg-white p-20 flex flex-col items-center justify-center w-1/2 rounded-xl'>
              <div className=' flex flex-col mb-10 items-center justify-center space-x-3'>
                                <MdAdminPanelSettings className='  size-40' />
                  <p className=' text-4xl font-semibold'>Admin Authentication</p>


              </div>
                      <Formik
          initialValues={initialvalues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mx-auto w-full max-w-md space-y-4 py-4">
              {fields.map(({ label, ...fieldProps }, index) => (
                <InputComponent key={index} label={label} {...fieldProps} />
              ))}
              <ButtonComponent
                type="submit"
                name={"Submit"}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
          </div>
    </div>
  )
}

export default Authentication