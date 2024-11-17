import { useEffect, useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined)

  useEffect(() => {   
    const id = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)

    setIntervalId(id)

    return () => clearInterval(id)
  }, [])

  const stopCounter = () => {
    setIsActive(true)
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  const restartCounter = () => {
    setCount(0)
    setIsActive(false)
    
    const id = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)
    setIntervalId(id)
  }

  return (
    <>
      <h1>Contador: {count}</h1>
      {isActive ? (
         <button onClick={restartCounter}>Reiniciar Contador</button>
      ) : (
        <button onClick={stopCounter}>Parar Contador</button>
       
      )}
    </>
  )
}

export default Contador