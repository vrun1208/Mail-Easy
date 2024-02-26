import './App.css'
import MailDisplay from './Components/display_prompt'
import TextBox from './Components/text_box'

function App() {

  return (
    <div className='container'>
      <div className="left-container">
        <h6 className='text-4xl  md:text-4xl lg:text-5xl font-extrabold p-2 '>
          <span style={{background:"#f59e0b", color:"#fff"}}>MailEasy,</span> create mails faster and easier.
        </h6>
        <TextBox />
      </div>
      <div className="right-container">
        <MailDisplay />
      </div>
    </div>
  )
}

export default App
