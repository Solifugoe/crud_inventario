import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' ;
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config';

const FormCreateProduct = () => {

    const initialCredentials = {
        name: '',
        description: '',
        image: '',
        stock: '',
        price: ''
    }

    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'Nombre demasiado corto').max(20, 'Nombre demasiado largo').required('El campo es obligatorio'),
        description:  Yup.string().min(10, 'Descripcion demasiado corta').max(100, 'Descripcion demasiado larga').required('El campo es obligatorio'),
        image: Yup.string().required('El campo es obligatorio'),
        stock: Yup.number().required('El campo es obligatorio'),
        price: Yup.number().required('El campo es obligatorio')
    })
    return (
        <div className='container'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={(values, {setSubmitting})  => {
                    // same shape as initial values
                    console.log(values);
                    axiosInstance.post('/', values)
                    .then(r => {
                        if (r.status == 201) {
                            console.log(r)
                            setSubmitting(false)
                        }else{
                            throw new Error(`[${r.status}]error en la solicitud`)
                        }
                    })
                    .catch( err => console.log(err))
                    
                }}
            >
                {({values, errors, touched, isSubmitting}) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='name'> Nombre del producto </label>
                                <Field id='name' type='text' placeholder='producto' name='name' className='form-control field-input'/>
                                {
                                    errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='description'> Descripcion  </label>
                                <Field id='description' type='text' placeholder='Descripcion' name='description' className='form-control field-input'/>
                                {
                                    errors.description && touched.description && (
                                    <ErrorMessage name='description' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='image'> Imagen </label>
                                <Field id='image' type='text' placeholder='imagen' name='image' className='form-control field-input'/>
                                {
                                    errors.image && touched.image && (
                                    <ErrorMessage name='image' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='stock'> Stock </label>
                                <Field id='stock' type='number' placeholder='5' name='stock' className='form-control field-input'/>
                                {
                                    errors.stock && touched.stock && (
                                    <ErrorMessage name='stock' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='price'> Precio </label>
                                <Field id='price' type='number' placeholder='8000' name='price' className='form-control field-input'/>
                                {
                                    errors.price && touched.price && (
                                    <ErrorMessage name='price' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                        <Button className='btn btn-primary' type="submit">Cargar producto</Button>
                        {
                            isSubmitting ? (<p>  Enviando producto </p>) : null
                        }
                        </Form>
                    )   
                }

            </Formik>
        </div>
    );
}

export default FormCreateProduct;
