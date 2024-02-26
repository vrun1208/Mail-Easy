import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMailContext } from '../Context/MailContext';
import erIcon from '../imgs/erIcon.svg';
import '../Styles/display_prompt.css'

const base_url = import.meta.env.VITE_API_URL;


const MailDisplay = () => {
  const {prompt, generatedData, setMail} = useMailContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState('');

  useEffect(() => {
    setDisplayedData('');

    const getData = async () => {
        const apiUrl = `${base_url}/prompt`;
        //console.log(apiUrl);

    try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.post(apiUrl, {
            text: prompt,
        });
        if(response.data.candidates[0].content !== undefined && response.data.candidates[0].content.length >0){
          var outputData = response.data.candidates[0].content;
        }else{
          var outputData = 'Please provide relevent and appropriate prompt!';
        }
        // const outputData = response.data.filters[0].reason;
        //console.log(outputData);

       setDisplayedData(outputData);
        setMail({prompt, generatedData: outputData});
    }catch(error){
        setError("Error generating data");
        console.error("Error generating data", error);
    }finally{
        setIsLoading(false);
    }};

    if(prompt.length > 0){
        getData();
    }
  }, [prompt]);

  const handleCopyToClip = async () => {
    try {
      await navigator.clipboard.writeText(displayedData);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Error copying to clipboard', err);
      alert('Error copying to clipboard');
    }
  };

  const handleReset = () => {
    setDisplayedData('');
    setMail({ prompt: '', generatedData: '' });
  };
  

  return (
    <>
    <div className="outer-container h-full lg:h-full sm:h-72 md:h-72 w-full backdrop-blur-sm bg-slate-900 bg-opacity-75 overflow-y-scroll text-wrap ">
      {isLoading && <>
        <div role="status" className='flex justify-center p-8 pt-24 top-3 left-3'>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </>}
      {error && <>
        <div className='flex justify-center p-8 pt-24'>
          <img src={erIcon} height="50px" width="50px" />
          <p className='text-red-500 font-bold'>{error}</p>
        </div>
      </>}
      {displayedData && (
        <>
          <div className="text-wrap overflow-y-auto sm:overflow-y-scroll md:overflow-y-scroll h-screen">
            <p className='whitespace-pre-wrap p-8 text-left'>
              {displayedData}
            </p>
          </div>
        </>
      )}
    </div>
    <div className='inner-container flex justify-end bg-slate-700 bg-opacity-50'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="w-4 h-4 mr-4 cursor-pointer" onClick={handleReset}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="w-4 h-4 mr-4 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="w-4 h-4 mr-2 cursor-pointer" onClick={handleCopyToClip}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>


    </div>
    </>
  );
};

export default MailDisplay;
