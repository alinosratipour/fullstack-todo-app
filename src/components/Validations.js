import * as yup from 'yup';


  export const schema = yup.object().shape({
    desc: yup.string().required("Please Enter Somthing To Do")
  
  });