// import React from 'react';
// import { Row, Col, Alert, Button } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// const JWTLogin = () => {
//   return (
//     <Formik
//       initialValues={{
//         email: 'info@codedthemes.com',
//         password: '123456',
//         submit: null
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         password: Yup.string().max(255).required('Password is required')
//       })}
//     >
//       {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <input
//               className="form-control"
//               label="Email Address / Username"
//               name="email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="email"
//               value={values.email}
//             />
//             {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
//           </div>
//           <div className="form-group mb-4">
//             <input
//               className="form-control"
//               label="Password"
//               name="password"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="password"
//               value={values.password}
//             />
//             {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
//           </div>

//           <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
//             <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Save credentials.
//             </label>
//           </div>

//           {errors.submit && (
//             <Col sm={12}>
//               <Alert>{errors.submit}</Alert>
//             </Col>
//           )}

//           <Row>
//             <Col mt={2}>
//               <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
//                 Signin
//               </Button>
//             </Col>
//           </Row>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default JWTLogin;



import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const navigate = useNavigate(); // To navigate after login

  return (
    <div style={{ 
      backgroundColor: '#d8dede', 
      backgroundImage: 'linear-gradient(315deg, #d8dede 0%, #e5bdf6 74%)', 
      border:'none',
      outline:'none'
    }}>
      <Formik
        initialValues={{
          username: 'user123',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Simulate login
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
            // Navigate to dashboard after login
            navigate('/app/dashboard/default');
          }, 1000);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Username"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            <div className="custom-control custom-checkbox text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert>{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block mb-4"
                  style={{ backgroundColor: '#6f1d99', borderColor: '#6f1d99' }} // Purple color
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default JWTLogin;

