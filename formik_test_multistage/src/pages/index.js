import React, { useState, useEffect } from "react"
import axios from "axios"
import WizardContainer from '../components/WizardContainer'
const IndexPage = () => {
  const [loading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [serverData,setServerData]=useState({})
  const [feedbackSent,setfeedbackSent]=useState(false)
  useEffect(() => {
    const FetchServerData = async () => {
      try {
        const serverResult = await axios.get("/api")
        const { data } = serverResult
        /* console.log(JSON.stringify(data)) */
        setIsLoading(false)
        setServerData(data)
      } catch (error) {
        setIsError(true)
      }
    }
    FetchServerData()
  }, [])
  const sendToServer=async(value)=>{
    setfeedbackSent(true)
    try {
      const serverResult= await axios.post("/api",value)
      const { data } = serverResult
      console.log(JSON.stringify(data))
    } catch (error) {
      setIsError(true)
    }
  }
  if (isError) {
    return <div>something went wrong</div>
  }
  if(feedbackSent){
    return (
      <div>
        <h1>Thank you for the submission</h1>
        <div>
          We'll contact you shortly!
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Testing with Formik wizard</h1>
      {loading ? (
        <h2>Fetching the required data, please hold</h2>
      ) : (
        <div><WizardContainer serverData={serverData.formInformation} infoToSend={sendToServer}/></div>
      )}
    </div>
  )
}
export default IndexPage
