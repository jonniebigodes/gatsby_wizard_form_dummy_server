import React, { useState, useEffect } from "react"
import { Formik, Field, ErrorMessage } from "formik"
const WizardContainer = ({ serverData,infoToSend }) => {
  // hook to contain the values recieved from the server request
  const [initialValues, setInitialValues] = useState(null)
  // hook to contain the current stage of the form
  const [currentItem, setItem] = useState(0)
  // hook to check if the form data as all been entered
  const [isLastPage,setLastPage]=useState(false)
  
  
  useEffect(() => {
    setInitialValues(serverData)
  }, [serverData])

  // moves the current item forward
  const moveNext = () => {
    setItem(currentItem+1)
  }
  // moves the current item backwards
  const movePrevious = () => {
    setItem(currentItem-1)
  }
  /**
   * 
   * @param {Object} values the present state of the values stored by formik
   * @param {Object} bag internal object from formik
   */
  const handleSubmit = (values, bag) => {
    // checks if the current item is last
    const allDataSubmitted = currentItem === Object.keys(serverData).length - 1
    setLastPage(allDataSubmitted)
    // if it's the last "page" sends the information back to the page and then to the server
    // otherwise moves onto the next item
    if (allDataSubmitted) {
      infoToSend(values)
    }
    else{
      bag.setTouched({});
      bag.setSubmitting(false);
      moveNext()
    }
    
  }
  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          enableReinitialize={false}
          onSubmit={handleSubmit}
          render={({
            initialValues,
            handleSubmit,
            isSubmitting,
            handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              <label>{Object.keys(initialValues)[currentItem]}</label>
              <Field
                name={Object.keys(initialValues)[currentItem]}
                component="input"
                type="text"
                placeholder="Enter the data in the input"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="field-error"
              />
              <div className="buttons">
                {currentItem > 0 && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={movePrevious}
                  >
                    « Previous
                  </button>
                )}

                {!isLastPage && <button type="submit">Next »</button>}
                {isLastPage && (
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                )}
              </div>
            </form>
          )}
        />
      )}
    </div>
  )
}

export default WizardContainer
