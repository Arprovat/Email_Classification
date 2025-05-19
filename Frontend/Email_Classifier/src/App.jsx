

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import axios from "axios"

export default function App() {
  const [email, setEmail] = useState({
    title:'',
    text:''
  })
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async() => {
    setIsLoading(true)
const result = await axios.post('http://localhost:8000/predict', email)
if(result){
  setIsLoading(false)
  setResult(result.data.result)
}
   
  }

  const handleClear = () => {
    setEmail({
    title:'',
    text:''
  })
    setResult(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-gray-800">Email Classifier</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-zinc-700 text-white rounded-2xl transition-colors"
          >
            About
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Email Classification</h2>
              <p className="text-gray-600 mt-1">Paste your email content below to check if it's spam</p>
            </div>
            <div>
              <label htmlFor="title">subject</label>
              <input type="text" 
              value={email.title}
               className="w-full  p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setEmail({...email,title:e.target.value})}
              />
            </div>
<div>
            <label htmlFor="title">Message</label>
            <textarea
              placeholder="Paste email content here..."
              className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email.text}
              onChange={(e) => setEmail({...email,text:e.target.value})}
            /></div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleClear}
                className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !email.title.trim()}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  isLoading || !email.title.trim()
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? "Analyzing..." : "Submit"}
              </button>
            </div>
          </div>

          {result !== null && (
            <div
              className={`bg-white rounded-lg shadow-sm border p-6 ${
                result ? 'border-red-500' : 'border-green-500'
              }`}
            >
              <div className={`${result ? 'text-red-600' : 'text-green-600'}`}>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  {result ? (
                    <>
                      <AlertCircle className="h-6 w-6" />
                      Spam Detected
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-6 w-6" />
                      Not Spam
                    </>
                  )}
                </h2>
                <p className={`mt-2 ${result ? 'text-red-500' : 'text-green-500'}`}>
                  {result
                    ? "This email has been classified as spam. Be cautious with its content."
                    : "This email appears to be legitimate."}
                </p>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                {result
                  ? "Our system detected patterns commonly found in spam emails. We recommend not responding to this email or clicking any links it contains."
                  : "Our system did not detect any suspicious patterns in this email. However, always exercise caution with unexpected emails."}
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm">
          Email Classification  &copy; Md. Abdur Rahman {new Date().getFullYear()}
        </div>
      </footer>

      {/* About Modal */}
      {isModalOpen && (
<div className="fixed inset-0 bg-zinc-900/10  backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">About Email Classifier</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                This email classification tool uses machine learning to identify potential spam emails. Our model
                analyzes the subject,content and structure of emails to determine if they're legitimate or unwanted spam.
              </p>
              <h4 className="font-medium text-gray-800">Model Information</h4>
              <p className="text-sm">
                I use ML model such as Logistic Regression,
Support Vector Machine,Random Forest.Then Voting Classifier combining this model trained on a dataset of over 400 labeled emails. The model achieves
                an overall accuracy of 95% on test data.
              </p>
              <h4 className="font-medium text-gray-800">How It Works</h4>
              <p className="text-sm">
                Simply paste the email subject and message into the input and text area and click "Submit". Our system will analyze the text
                and provide an instant classification result.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}