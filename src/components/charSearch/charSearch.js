import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';

import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import './charSearch.scss'

const CharSearch = () => {
    const [char, setChar] = useState(null)
    const { loading, error, getCharacterFind, clearError } = useMarvelService()


    const getCharFind = (name) => {
        clearError()
        getCharacterFind(name).then(onCharFind)
    }

    const onCharFind = (char) => {
        setChar(char)
        console.log(char);
    }

    const errorMessage = error ? <div className="charSearch__msg error">EEEEEEE</div> : null
    const results = !char ? null : char.length > 0 ? <div className='charSearch__msg'>
        <h3>{`There is! Visit ${char[0].name} page?`}</h3>
        <Link to={`/characters/${char[0].id}`} className="button button__main">
            <div className="inner">
                TO PAGE
            </div>
        </Link>
    </div> : <h3 className='charSearch__msg error'> The character was not found. Check the name and try again</h3>

    return (
        <div className="charSearch">
            <h3>
                Or find a character by name:
            </h3>

            <Formik
                initialValues={{
                    char: ''
                }}

                validationSchema={Yup.object({
                    char: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле!')
                })}

                onSubmit={values => getCharFind(values.char)}
            >
                <Form>
                    <div className="charSearch__form">
                        <div>
                            <Field name='char' type="text" className='charSearch__form-input' placeholder='Enter name' />
                        </div>
                        <button type='submit' className="button button__main" disabled={loading}>
                            <div className="inner">
                                FIND
                            </div>
                        </button>
                    </div>
                    <div>
                        <FormikErrorMessage className='charSearch__msg error' name='char' component='h3' />
                    </div>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div >
    )
}

export default CharSearch