import { useCallback, useState ,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSRTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str += "0123456789"
    }

    if (characterAllowed) {
      str += "!@#$^&%({})_-+*"
    }

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,setPassword])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-4xl text-center my-3'>Password Generator</h1>
        <div className='flex flex-wrap shadow rounded-lg overflow-hidden mb-4 '>
          <input type="text"
            value={password}
            placeholder='password'
            className='w-80 outline-none px-3 py-1'
            readOnly
            ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className='w-20 outline-none bg-blue-700 text-white px-3 py-0.5 rounded hover:bg-slate-400'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-centergap-x-1'>
            <input type='range' 
             min={6}
             max={20}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}}
             /><label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
             defaultValue={numberAllowed}
              id='number'
              onChange={()=>{setNumberAllowed((prev)=>!prev);}}
              /> <label htmlFor="number">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultValue={characterAllowed}
            id='character'
            onChange={()=>{setCharacterAllowed((prev)=>!prev);}}/><label htmlFor='character'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
